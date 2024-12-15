import { IEnvironment } from './environment.interface';
console.log('in envirement.ts');
export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'dummy',
    rcmndApiUrl: 'dummy',


    MONGO_DB_CONNECTION_STRING: 'dummy',
    NEO4J_DB_CONNECTION_STRING: '',
    NEO4J_DB_DATABASE_NAME: '',
    NEO4J_DB_USERNAME: '',
    NEO4J_DB_PASSWORD: ''
};
