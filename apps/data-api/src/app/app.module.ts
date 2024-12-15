import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from '@avans-nx-songlibrary/backend/features';
import { PlaylistModule } from '@avans-nx-songlibrary/backend/features';
import { ArtistModule } from '@avans-nx-songlibrary/backend/features';
import { AlbumModule } from '@avans-nx-songlibrary/backend/features';
import { UserModule } from '@avans-nx-songlibrary/backend/features';
import { AuthModule } from '@avans-nx-songlibrary/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

@Module({
    imports: [UserModule, SongModule, PlaylistModule, ArtistModule, AlbumModule, AuthModule, MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING)],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    private readonly logger = new Logger(AppModule.name);

    constructor() {
        this.logger.log('AppModule initialized');
    }
}
