import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IArtist } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env'

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
@Injectable({ providedIn: 'root' })
export class ArtistService {
    endpoint = environment.dataApiUrl + '/artist';

    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IArtist[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IArtist[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IArtist[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IArtist> {
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponse<IArtist>>(this.endpoint, {
                ...options,
                ...httpOptions,
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
        console.log('handleError in Artistservice', error);

        return throwError(() => new Error(error.message));
    }
}
