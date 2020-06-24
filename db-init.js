const fs = require('fs');
const Database = require('better-sqlite3');
const env = process.env.NODE_ENV;
const dir = (env === 'dev') ? '' : '/storage/';
const dbPath = dir + 'ambiserve.db';

// //create directory
// try {
//     fs.opendirSync('db');
// } catch (error) {
//     fs.mkdirSync('db');
// }

const db = new Database(dbPath, { verbose: console.log });
db.prepare(`CREATE TABLE minutedata (
    dateutc int NOT NULL PRIMARY KEY,
    winddir int, 
    windspeedmph decimal(4,1), 
    windgustmph decimal(4,1),
    maxdailygust decimal(4,1),
    tempf decimal(4,1),
    hourlyrainin decimal(4,2),
    dailyrainin decimal(4,2),
    weeklyrainin decimal(4,2),
    monthlyrainin decimal(4,2),
    totalrainin decimal(4,2),
    baromrelin decimal(4,2),
    baromabsin decimal(4,2),
    humidity int,
    tempinf decimal(4,1),
    humidityin int,
    uv int,
    solarradiation decimal(6,2),
    feelslike decimal(5,2),
    dewpoint decimal(5,2),
    feelslikein decimal(5,2),
    dewpointin decimal(5,2)
    )`
).run();