export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;
    rcmndApiUrl: string;

    MONGO_DB_CONNECTION_STRING: string;
    NEO4J_DB_CONNECTION_STRING: string;
    NEO4J_DB_DATABASE_NAME: string;
    NEO4J_DB_USERNAME: string;
    NEO4J_DB_PASSWORD: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is
}
