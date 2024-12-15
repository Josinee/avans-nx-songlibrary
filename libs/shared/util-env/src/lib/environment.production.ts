import { IEnvironment } from './environment.interface';
console.log("production");
export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://songlibrary.onrender.com/login',
    dataApiUrl: 'https://avans-nx-songlibrary.onrender.com/api',
    rcmndApiUrl: 'https://rcmnd-api.onrender.com/api',

    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    NEO4J_DB_CONNECTION_STRING: process.env.NEO4J_DB_CONNECTION_STRING,
    NEO4J_DB_DATABASE_NAME: process.env.NEO4J_DB_DATABASE_NAME,
    NEO4J_DB_USERNAME: process.env.NEO4J_DB_USERNAME,
    NEO4J_DB_PASSWORD: process.env.NEO4J_DB_PASSWORD
}
