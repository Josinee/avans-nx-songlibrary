import { IEnvironment } from './environment.interface';
console.log('Development');
export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',
    rcmndApiUrl: 'http://localhost:3100/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/songlibrary'
};
