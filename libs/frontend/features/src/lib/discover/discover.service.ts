import { forkJoin, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { ApiResponse, IArtist, ISong } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class DiscoverService {
    endpoint = environment.rcmndApiUrl + '/songs';

    constructor(private readonly http: HttpClient, private artistService: ArtistService, private albumService: AlbumService) {}

    public list(song: string, options?: any): Observable<ISong[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint + `/${song}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getRecommendationsForUser(user: string, options?: any): Observable<ISong[]> {
        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint + `/recommendations/${user}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                mergeMap((response: any) => {
                    const songs = response.results;

                    const songRequests = songs.map((result: any) =>
                        forkJoin({
                            artist: this.artistService.read(result.artistId),
                            album: this.albumService.read(result.albumId)
                        }).pipe(
                            map(({ artist, album }) => ({
                                _id: result.id,
                                title: result.title,
                                duration: result.duration.low,
                                genre: result.genre,
                                songText: result.songText,
                                artist,
                                album
                            }))
                        )
                    );

                    return forkJoin(songRequests);
                }),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<IArtist> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<IArtist>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IArtist),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in DiscoverService', error);

        return throwError(() => new Error(error.message));
    }
}
