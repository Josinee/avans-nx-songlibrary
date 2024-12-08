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
export class AlbumService {
    endpoint = environment.dataApiUrl + '/album';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IAlbum[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IAlbum[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IAlbum[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }


    public read(id: string | null, options?: any): Observable<IAlbum> {
        console.log(`read ${this.endpoint + `/${id}`}`);
        return this.http
            .get<ApiResponse<IAlbum>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IAlbum),
                catchError(this.handleError),
                
            );
            
    }


    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in AlbumService', error);

        return throwError(() => new Error(error.message));
    }
}
