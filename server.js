import got from 'got'
import 'dotenv/config'
import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const app = express();
const port = process.env.PORT || 4000;
// const cors = require('cors')
import Database from 'better-sqlite3';
const env = process.env.NODE_ENV;
const dir = (env === 'dev') ? '' : '/storage/';
const dbPath = dir + 'ambiserve.db';
const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'build');

let corsOptions = {
    origin : '*'
};

let stationJson = '';
let forecastJson = '';
let isHotterOutside = false;

const db = new Database(dbPath);
const requestURL = `https://api.ambientweather.net/v1/devices?applicationKey=${process.env.AMBIENT_APP_KEY}&apiKey=${process.env.AMBIENT_API_KEY}`;

// app.use(cors(corsOptions));

//https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08
app.use(express.static(buildPath));

app.get('/api/current', async (req, res) => {
    var endTime = Date.now() - 86400000;
    var today = new Date();
    today.setHours(0,0,0);
    var todayStart = today.getTime() / 1000;

    var lastDayData = getHistory(endTime, 288);
    var tempDiff = lastDayData[0] ? (stationJson[0].lastData.tempf - lastDayData[0].tempf) : null;

    var tempArray = [];
    lastDayData.forEach(d => {
        if(d.dateutc >= todayStart) {
            tempArray.push(d.tempf);
        }
    })

    let maxTemp = null;
    let minTemp = null;
    let avgTemp = null;

    if(tempArray.length > 0) {
        maxTemp = Math.max(...tempArray);
        minTemp = Math.min(...tempArray);
        avgTemp = tempArray.reduce((a, b) => a + b) / tempArray.length;
    }

    // console.log('todayStart: ' + today.getTime());
    // console.log('endDate: ' + endTime);
    // console.log(tempArray);

    if(forecastJson == '') {
        updateForecastData();
    }

    let response = {
        weatherData : stationJson, 
        forecastData : forecastJson,
        lastDay : { 
            "tempDiff" : tempDiff,
            "maxTemp" : maxTemp,
            "minTemp" : minTemp,
            "avgTemp" : avgTemp
        }
    }

    res.json(response);
});

app.get('/api/history', async (req, res) => {
    var endTime = (Date.now()) - 86400000;
    let prevData = getHistory(endTime, 288);

    let response = {
        data : prevData
    }

    res.json(response);
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

async function updateStationData() {
    try {
        stationJson = await got(
            requestURL)
            .json();

        console.log(stationJson);
    } catch (error) {
        console.log(error);
    }
}

async function updateForecastData() {
    forecastJson = [];
    // try {
    //     let darkSkyData = await got(`https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${process.env.FORECAST_LAT_LON}`).json();
    //     forecastJson = {
    //         data : darkSkyData,
    //         updated : Date.now()
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
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
    try {
        let prevData = await got(
            `https://api.ambientweather.net/v1/devices/${process.env.AMBIENT_DEVICE_MAC}?applicationKey=${process.env.AMBIENT_APP_KEY}&apiKey=${process.env.AMBIENT_API_KEY}&endDate=${endDate}&limit=${limit}`)
            .json();

        for(let e of prevData) {
            let time = e.dateutc;
            e.dateutc = time / 1000;
        }
    
        return prevData;
    } catch (error) {
        console.error('Error getting historical data!');
        console.log(error);
    }
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
    let lastTimestamp = lastEntry.timestamp * 1000;

    let timeDiff = Date.now() - lastTimestamp;
    let limit = Math.floor(timeDiff / 300000);
    
    let data = await getHistoricalData(Date.now(), limit);
    
    insertData(data);

    compareValues();
}

async function compareValues() {
    let entry = db.prepare(`SELECT * FROM minutedata WHERE dateutc=(SELECT max(dateutc) FROM minutedata)`).get();

    let message = '';

    if(!isHotterOutside && entry.tempf > entry.tempinf) {
        message = `It's hotter outside (${entry.tempf}°) than inside (${entry.tempinf}°)!`;
        isHotterOutside = true;
    } else if (isHotterOutside && entry.tempf < entry.tempinf) {
        message = `It's cooler outside (${entry.tempf}°) than inside (${entry.tempinf}°)!`;
        isHotterOutside = false;
    }

    if(message != '') {
        let notification = {
            "token" : `${process.env.PUSHOVER_APP_TOKEN}`,
            "user" : `${process.env.PUSHOVER_USER_KEY}`,
            "message" : message
        };

        try {
            let post = 
            await got.post('https://api.pushover.net/1/messages.json', {
                json: notification
            });

            console.log(post.body);
        } catch (error) {
            console.log("**********\n" + error);
        }
    }  
}

function getHistory(endTime, limit = 288) {
    try {
        let query = db.prepare(`SELECT * FROM minutedata WHERE dateutc >= ? LIMIT ?`);
        let entries = query.all(endTime / 1000, limit) ;
        console.log(entries);
        return entries;
    } catch (error) {
        console.log(error);
    }
}

updateStationData();
updateForecastData();
backfillHistory();

setInterval(updateStationData, 60000);
setInterval(updateForecastData, 3600000);
setInterval(updateHistoryData, 300000);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));