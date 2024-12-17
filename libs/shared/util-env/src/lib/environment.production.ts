import { IEnvironment } from './environment.interface';
console.log("production");
export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://songlibrary.onrender.com/',
    dataApiUrl: 'https://avans-nx-songlibrary.onrender.com/api',
    rcmndApiUrl: 'https://rcmnd-api.onrender.com/api',

    MONGO_DB_CONNECTION_STRING: '...',
    NEO4J_DB_CONNECTION_STRING: '...',
    NEO4J_DB_DATABASE_NAME: 'neo4j',
    NEO4J_DB_USERNAME: 'neo4j',
    NEO4J_DB_PASSWORD: '...',
};
