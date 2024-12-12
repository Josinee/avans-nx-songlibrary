import { IEnvironment } from './environment.interface';
console.log("production");
export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://nxworkshop.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING: process.env.MONGO_URI
};
