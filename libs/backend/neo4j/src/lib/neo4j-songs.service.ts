import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { ISong } from '@avans-nx-songlibrary/api';

@Injectable() 
export class Neo4JService {
    private readonly logger: Logger = new Logger(Neo4jService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    // async findAll(): Promise<any> {
    //     const results = await this.neo4jService.read(`MATCH (n) RETURN n LIMIT 25`);
    //     const songs = results.records.filter((record: any) => record._fields[0].labels.includes('Song')).map((record: any) => record._fields[0].properties);

    //     return songs;
    // }

    // async findSimilar(song: string): Promise<ISong[]> {
    //     const results = await this.neo4jService.read(`MATCH (song:Song {id: '${song}'})-[:SIMILAR_TO]-(similarSong:Song) RETURN similarSong`);
    //     const songs = results.records.map((record: any) => record._fields[0].properties);
    //     return songs;
    // }

    async matchSimilar(): Promise<any> {
        const match = await this.neo4jService.write(`MATCH (s1:Song), (s2:Song)
                    WHERE s1.id < s2.id

                    FOREACH (_ IN CASE WHEN s1.artist = s2.artist THEN [1] ELSE [] END |
                    MERGE (s1)-[:SIMILAR_ARTIST]->(s2)
                    )

                    FOREACH (_ IN CASE WHEN s1.genre = s2.genre THEN [1] ELSE [] END |
                    MERGE (s1)-[:SIMILAR_GENRE]->(s2)
                    )

                    FOREACH (_ IN CASE WHEN s1.album = s2.album THEN [1] ELSE [] END |
                    MERGE (s1)-[:SIMILAR_ALBUM]->(s2)
                    )`)

    }

    async getRecommendationsFromUser(user: string): Promise<any> {
        const results = await this.neo4jService.read(`
            MATCH (u:User {id: '${user}'})-[:LIKES]->(liked:Song)
                MATCH (candidate:Song)
                WHERE NOT (u)-[:LIKES]->(candidate)
                OPTIONAL MATCH (liked)-[r:SIMILAR_GENRE|SIMILAR_ARTIST|SIMILAR_ALBUM]->(candidate)
                WITH candidate, count (r) AS matchCount, collect(DISTINCT type(r)) AS relationshipTypes
                WHERE matchCount > 0
                ORDER BY matchCount DESC
                RETURN candidate AS similarSong, relationshipTypes, matchCount
        `);
    
        if (!results.records || results.records.length === 0) {
            return [];
        }
    
        const songs = results.records.map((record: any) => {
            const song = record._fields[0].properties;
            const relationshipTypes = record._fields[1];
            const matchCount = record._fields[2].low;
            return { 
                song,
                relationshipTypes,
                matchCount 
            };
        });
    
        return songs;
    }

    async postSong(song: { id: string, title: string, genre: string, artist: string, album?: string}) {
        console.log("in neoservice " + song.id + song.title + song.genre + song.album + song.artist)
        await this.neo4jService.write(`           
             MERGE (s:Song {id: $songId})
                        ON CREATE SET 
                s.name = $title,
                s.genre = $genre,
                s.artist = $artist,
                s.album = $album`, {
                    songId: song.id,
            title: song.title || null,
            genre: song.genre || null,
            artist: song.artist || null,
            album: song.album || null,
                });
    }

    async postUser(user: {id: string; username?: string}) {
        await this.neo4jService.write(`
            MERGE (u:User {id: $userId})
            On CREATE SET u.name = $username`, {
                userId: user.id || null,
                username: user.username || null
            });

        }
    

    async putLikedSong(user: { id: string; username?: string }, song: { id: string; title?: string, genre?: string, artist?: string, album?: string }) {
        console.log('put liked song')
        console.log(song.id + song.title + song.genre + song.album + song.artist)
        await this.neo4jService.write(`
            MERGE (n:User {id: $userId})
            ON CREATE SET n.name = $username
            MERGE (s:Song {id: $songId})
                        ON CREATE SET 
                s.name = $title,
                s.genre = $genre,
                s.artist = $artist,
                s.album = $album
            MERGE (n)-[:LIKES]->(s)
        `, {
            userId: user.id,
            username: user.username || null,
            songId: song.id,
            title: song.title || null,
            genre: song.genre || null,
            artist: song.artist || null,
            album: song.album || null,
        });
    }

    async deleteLikedSong(song: string, user: string) {
        const result = await this.neo4jService.write(`Match(n:User{id:'${user}'}), (s:Song{id: '${song}'}), (n)-[r:LIKES]->(s) delete (r)`);
        return result;
    }
}
