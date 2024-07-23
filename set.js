const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0NXMExGRjl1SXVKbkg1RWNaQXZhV0hJcFRNU09lZStRYWpoUWk4ZGxGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFRlY01UUERLZFNOQ1E2TktkOUJ1WmdFYUZsNUlTK1ArMmVrQnN6cmRTRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRjFPZ2dMbHFMempjU24rWkV1ZUR5eTk2cmlyczF2azU0Q045NWJwaVVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3dFNtR2I2OTFMQnRlV2g0SnlxZDRBaGtMakpnZFpqSHJFUGlIOW9qK2ljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRITkRNMWVQQXNkTWU3c1BRNmtYV05MeHV0NWJFdG9vVEFJNGV4YlN0Rkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZ6NkVWbnNSYmZlcEdUdS9GNktqcEtpanc4anVVODZWOVUya3VMbHY2eVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1BzMTBScjNuUHQyMC9iTzlWZkQxcUZjcm9kQzFWVDNEdHhWQWk0bVIyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDJkQU5lcERLNExmUjdTTDdCdHZqSDNNVWlrVEl6VGYvN1FmY0tYckduTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1wSk5UZWhTT1c0emxVaVQxRm83ai9pbmpGbXJCTzJSSzR2S2hpSit3bHhVYkVidTkvbzJsUFlONmtPaHlRK2I4YzBCb3AreHhEWHBLeUJqL3NBaWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTAsImFkdlNlY3JldEtleSI6ImFtOUNISlJBNkdzLzY3WE91THNwY0Y4NWRWMmVoMFNCRktrZjAzcm5OM2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlE1TGNhNzQ1UVJDYm5BcTloZ1R4eVEiLCJwaG9uZUlkIjoiMzQzNjYyY2UtNjM4OS00ZTY1LTgwMmQtZTg5MTU3ZmNhMDRmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJVYjZZQnBqa01nT05teDh5Wk8rUUlGdmErWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIdWFoRzkrRVRkdlREMXgvS3VrUnBxR0JvZmM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRFAxWkdLSjciLCJtZSI6eyJpZCI6IjIzNDgwNjM2Nzk2MjY6MzlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8JODtSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUEsxMm9nQkVNUE8vN1FHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT1ZkTGpMeUdPTjVJcWZKZkdaYVN3MndzMkdQbFhZN1A4WWhLSGU3aWtVZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNlZvZVZLYXQ4L3R2YlB2eTZHQVAwMUJ1OHJWODZrbDMyR1VPdWZRUk5QaWF5SHRvVzdoMjJoOXRUU0Y4RHRIM21YaUIySFBuOEI5RGE5QzlvbUNRQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImhJV0tNZVYxMmFlWUE1SGlBeU9sWTJ1WUU4NTc5dHlFUTc2czhiWkp3cE5BVGorMjZ3UmkxWExqTlFIOWd6NzZ1R0ltNUtFTnY5NzZ5T0krNXhjQ2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA2MzY3OTYyNjozOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUbFhTNHk4aGpqZVNLbnlYeG1Xa3NOc0xOaGo1VjJPei9HSVNoM3U0cEZJIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNzU1NDcyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtUOCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
