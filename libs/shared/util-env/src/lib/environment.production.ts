import { IEnvironment } from './environment.interface';
console.log("production");
export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://avans-nx-songlibrary.onrender.com/api',
    rcmndApiUrl: 'somehting something',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://josine:Wachtwoord@cluster.n2zfb.mongodb.net/song-library',
    NEO4J_DB_CONNECTION_STRING: 'neo4j+s://1b1e492e.databases.neo4j.io',
    NEO4J_DB_DATABASE_NAME: 'Instance01',
    NEO4J_DB_USERNAME: 'neo4j',
    NEO4J_DB_PASSWORD: 'bH7kKQvOOmsFoXlUzl1Z8HfUT1i-uM3wRww9zOVYEpM',
};
