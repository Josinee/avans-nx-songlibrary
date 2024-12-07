import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IPlaylist } from '@avans-nx-songlibrary/api';
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

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IPlaylist> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponse<IPlaylist>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IPlaylist),
                catchError(this.handleError)
            );
    }

    public create(playlist: IPlaylist, options?: any): Observable<IPlaylist> {
        console.log(`create ${this.endpoint}`);
        return this.http
            .post<IPlaylist>(this.endpoint, playlist, { ...options, ...httpOptions })
            .pipe(
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in PlaylistService', error);

        return throwError(() => new Error(error.message));
    }
}
