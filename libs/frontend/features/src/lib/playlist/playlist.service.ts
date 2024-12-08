import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICreatePlaylist, IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env'
import { FormsModule } from '@angular/forms'  

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

/**
 *
 *
 */ 
@Injectable({ providedIn: 'root', })
export class PlaylistService {
    endpoint = environment.dataApiUrl + '/playlist';

    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IPlaylist[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IPlaylist[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IPlaylist[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getSongsByPlaylist(id: string, options?: any): Observable<ISong[]> {
        console.log(`list ${this.endpoint}`+ `/${id}`);
        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results.songs as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
            
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IPlaylist> {
        console.log(`read ${this.endpoint}`+ `/${id}`);
        return this.http
            .get<ApiResponse<IPlaylist>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IPlaylist),
                catchError(this.handleError)
            );
    }

    public create(playlist: ICreatePlaylist, options?: any): Observable<IPlaylist> {
        console.log(`create ${this.endpoint}`);
        return this.http
            .post<IPlaylist>(this.endpoint, playlist, { ...options, ...httpOptions })
            .pipe(
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    public addToPlaylist(playlist: IPlaylist, song: ISong, options?: any): Observable<IPlaylist> {
        console.log("add song to playlist");
        playlist.songs.push(song);
        playlist.numberOfSongs++;
        playlist.duration += song.duration;
        playlist.lastUpdated = new Date();
        return this.http
        .put<IPlaylist>(`${this.endpoint}/${playlist._id}`, playlist, { ...options, ...httpOptions })
        .pipe(
            tap(response => console.log(response)),
            map((response: any) => response.results),
            catchError(this.handleError)
        );
    }

    public removeFromPlaylist(playlist: IPlaylist, song: ISong, options?: any): Observable<IPlaylist> {
        console.log("delete song from playlist");
        const songdelete = playlist.songs.indexOf(song)
        console.log(songdelete);
        playlist.songs.splice(songdelete, 1);
        playlist.numberOfSongs--;
        playlist.duration -= song.duration;
        playlist.lastUpdated = new Date();
        
        return this.http
        .put<IPlaylist>(`${this.endpoint}/${playlist._id}`, playlist, { ...options, ...httpOptions })
        .pipe(
            tap(response => console.log(response)),
            map((response: any) => response.results),
            catchError(this.handleError)
        );
    }

    // public deleteFromPlaylist(playlist: IPlaylist, song: ISong, options?:any): Observable<IPlaylist> {
    //     console.log("delete song from playlist");
    //     const songdelete = playlist.songs.indexOf(song)
    //     console.log(songdelete);
    //     playlist.songs.splice(songdelete, 1);

    //     return this.http
    //     .delete<IPlaylist>(`${this.endpoint}/${playlist._id}`, playlist, { ...options, ...httpOptions })
    //     .pipe(
    //         tap(console.log),
    //         map((response: any) => response.results as IPlaylist),
    //         catchError(this.handleError)
    //     )
    // }
    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in PlaylistService', error);

        return throwError(() => new Error(error.message));
    }
}
