import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { ISong } from '@avans-nx-songlibrary/api';

@Injectable()
export class Neo4JService {
    private readonly logger: Logger = new Logger(Neo4jService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findall songs');
        const results = await this.neo4jService.read(`MATCH (n) RETURN n LIMIT 25`);
        const songs = results.records.filter((record: any) => record._fields[0].labels.includes('Song')).map((record: any) => record._fields[0].properties);
        return songs;
    }

    async findSimilar(songTitle: string): Promise<ISong[]> {
        const results = await this.neo4jService.read(`MATCH (song:Song {name: '${songTitle}'})-[:SIMILAR]-(similarSong:Song) RETURN similarSong`);
        const songs = results.records.map((record: any) => record._fields[0].properties);
        return songs;
    }

    // async findSimilar(song: ISong): Promise<any> {
    //     const results = await this.neo4jService.read(``);
    // }
    //     async findAll(): Promise<any> {
    //         this.logger.log('findAll users');
    //         const results = await this.neo4jService.read(
    //             `MATCH people=()-[:WorksIn]->(t:Team {name:'Informatica'}) RETURN people;`
    //         );
    //         const users = results.records.map(
    //             (record: any) => record._fields[0].start.properties
    //         );
    //         return users;
    //     }
}
