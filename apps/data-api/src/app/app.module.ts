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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
          }),
        MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
        UserModule,
        SongModule,
        PlaylistModule,
        ArtistModule,
        AlbumModule,
        AuthModule,
      ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    private readonly logger = new Logger(AppModule.name);

    constructor(private readonly configService: ConfigService) {
        console.log('MongoDB URI:', this.configService.get<string>('MONGO_DB_CONNECTION_STRING'));
      }
}
