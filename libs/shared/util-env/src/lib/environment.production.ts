import { IEnvironment } from './environment.interface';
console.log("production");
export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://avans-nx-songlibrary.onrender.com/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://josine:Wachtwoord@cluster.n2zfb.mongodb.net/song-library'
};
