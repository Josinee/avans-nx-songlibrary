import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IAlbum, ISong } from '@avans-nx-songlibrary/api';

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
export class SongService {
    endpoint = environment.dataApiUrl + '/song';

    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<ISong[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<ISong> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<ISong>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ISong),
                catchError(this.handleError)
            );
    }


    public getByAlbum(albumId: string | null, options?: any): Observable<ISong[]> {
        console.log(albumId + 'get by album in song service');
        if(albumId){
            
        }
        return this.http.get<ApiResponse<ISong>>(`${environment.dataApiUrl}/album/${albumId}`, {
            ...options,
            ...httpOptions,
        })
        .pipe(
            tap(console.log),
            map((response: any) => response.results as ISong[]),
            catchError(this.handleError)
        )
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}
