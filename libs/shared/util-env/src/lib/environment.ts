import { IEnvironment } from './environment.interface';
console.log('in envirement.ts');
export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'dummy',
    

    MONGO_DB_CONNECTION_STRING: 'dummy'
};