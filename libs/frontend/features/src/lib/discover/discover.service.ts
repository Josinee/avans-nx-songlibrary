import { forkJoin, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { ApiResponse, IArtist, ISong } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

/**
 *
 *
 */
@Injectable({ providedIn: 'root' })
export class DiscoverService {
    //endpoint = environment.dataApiUrl + '/artist';
    endpoint = environment.rcmndApiUrl + '/songs';

    constructor(private readonly http: HttpClient, private artistService: ArtistService, private albumService: AlbumService) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
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
    
                    // Create an Observable for each song to fetch artist and album details
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
                                artist, // Fetched artist details
                                album   // Fetched album details
                            }))
                        )
                    );
    
                    // Combine all song-related Observables into a single array Observable
                    return forkJoin(songRequests);
                }),
                tap(console.log), // Debug output
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
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

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in DiscoverService', error);

        return throwError(() => new Error(error.message));
    }
}
