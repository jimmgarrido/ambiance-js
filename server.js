require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
const got = require('got');
// const cors = require('cors')
const Database = require('better-sqlite3');
const env = process.env.NODE_ENV;
const dir = (env === 'dev') ? '' : '/storage/';
const dbPath = dir + 'ambiserve.db';
const buildPath = path.join(__dirname, 'build');

let corsOptions = {
    origin : '*'
};

let forecastJson = '';
let oldData = '';

const db = new Database(dbPath);

// app.use(cors(corsOptions));

https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08
app.use(express.static(buildPath));

app.get('/api', async (req, res) => {
    let requestURL = `https://api.ambientweather.net/v1/devices?applicationKey=${process.env.AMBIENT_APP_KEY}&apiKey=${process.env.AMBIENT_API_KEY}`

    try {
        let ambientWeatherData = await got(
            requestURL)
            .json();
        
        var endDate = Date.now() - 86400000;

        if(forecastJson == '')
            updateForecastData();

        let response = {
            weatherData : ambientWeatherData, 
            forecastData: forecastJson
        }

        res.json(response);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/history', async (req, res) => {
    var time = (Date.now() / 1000) - 86400;
    let prevData = getHistory(time);

    let response = {
        data : prevData
    }

    res.json(response);
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

async function updateForecastData() {
    try {
        let darkSkyData = await got(`https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${process.env.FORECAST_LAT_LON}`).json();
        forecastJson = {
            data : darkSkyData,
            updated : Date.now()
        }
    } catch (error) {
        console.log(error);
    }
};

async function backfillHistory()
{
    //get last db entry
    //compare with current timestamp
    //calculate ms between (convert ms to s)
    //divide by 288 to determine if multiple requests are needed

    let historicalData;
    let lastEntry = db.prepare(`SELECT max(dateutc) AS timestamp FROM minutedata`).get();

    if(lastEntry.timestamp === null) {
        historicalData = await getHistoricalData(Date.now());
        insertData(historicalData);
    } else {
        let currentTime = Date.now();
        let lastTimestamp = lastEntry.timestamp * 1000;
        let timeDiff = currentTime - lastTimestamp;

        if(timeDiff > 300000) {
            let missingPoints = timeDiff / 300000;

            if(missingPoints < 288) {
                let limit = Math.floor(missingPoints);
                historicalData = await getHistoricalData(currentTime, limit);
                insertData(historicalData);
            } else {
                // let numCalls = Math.floor(missingPoints / 288);
                // let limit = Math.floor(missingPoints);
                let endDate = lastTimestamp + (300000 * 288);
                // console.log(`Missing points: ${missingPoints}\nNum loops: ${numCalls}\nLast limit: ${lastLimit}`);

                historicalData = await getHistoricalData(endDate);
                insertData(historicalData);

                backfillHistory();
            }
        }
    }

}

async function getHistoricalData(endDate, limit = 288)
{
    let prevData = await got(
        `https://api.ambientweather.net/v1/devices/${process.env.AMBIENT_DEVICE_MAC}?applicationKey=${process.env.AMBIENT_APP_KEY}&apiKey=${process.env.AMBIENT_API_KEY}&endDate=${endDate}&limit=${limit}`)
        .json();

    for(let e of prevData) {
        let time = e.dateutc;
        e.dateutc = time / 1000;
    }

    return prevData;
}

function insertData(historicalData)
{
    //https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#transactionfunction---function
    let query = db.prepare(`INSERT INTO minutedata (
        dateutc,
        winddir, 
        windspeedmph, 
        windgustmph,
        maxdailygust,
        tempf,
        hourlyrainin,
        dailyrainin,
        weeklyrainin,
        monthlyrainin,
        totalrainin,
        baromrelin,
        baromabsin,
        humidity,
        tempinf,
        humidityin,
        uv,
        solarradiation,
        feelslike,
        dewpoint,
        feelslikein,
        dewpointin
        ) VALUES (
        @dateutc,
        @winddir,
        @windspeedmph,
        @windgustmph,
        @maxdailygust,
        @tempf,
        @hourlyrainin,
        @dailyrainin,
        @weeklyrainin,
        @monthlyrainin,
        @totalrainin,
        @baromrelin,
        @baromabsin,
        @humidity,
        @tempinf,
        @humidityin,
        @uv,
        @solarradiation,
        @feelsLike,
        @dewPoint,
        @feelsLikein,
        @dewPointin
        )`
    );

    let insertTransaction = db.transaction((data) => {
        for(const entry of data) {
            query.run(entry)
        }
    });
    
    try {
        insertTransaction(historicalData);
    } catch (error) {
        console.log(`****** Caught error: \n ${error}`);

        if(historicalData.length > 0) {
            historicalData.pop();
            insertData(historicalData);
        }
    }
}

async function updateHistoryData() {
    let lastEntry = db.prepare(`SELECT max(dateutc) AS timestamp FROM minutedata`).get();
    let currentTime = Date.now();
    let lastTimestamp = lastEntry.timestamp * 1000;
    let timeDiff = currentTime - lastTimestamp;
    let limit = Math.floor(timeDiff / 300000);
    
    let data = await getHistoricalData(Date.now(), limit);
    
    insertData(data);
}

function getHistory(endTime) {
    let query = db.prepare(`SELECT * FROM minutedata WHERE dateutc >= ?`);
    let entries = query.all(endTime);
    // console.log(entries);
    return entries;
}

updateForecastData();
backfillHistory();

setInterval(updateForecastData, 3600000);
setInterval(updateHistoryData, 300000);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));