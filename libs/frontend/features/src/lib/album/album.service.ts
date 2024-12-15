import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    
        let params = new HttpParams();
    
        // If options contain 'startDate', append it to params
        if (options?.dateOfRelease?.startDate) {
            console.log('ja gaad goed')
            // Convert startDate to ISO string format for the backend
            const startDate = options.dateOfRelease.startDate.toISOString();
            console.log(startDate)
            params = params.append('startDate', startDate);
            console.log(params)
        }
    
        // Send the HTTP GET request with the params
        return this.http
            .get<ApiResponse<IAlbum[]>>(this.endpoint, {
                params: params,  // Pass the HttpParams with the query parameters
                observe: 'body',  // Expect response body
                responseType: 'json',  // Response type as JSON
            })
            .pipe(
                map((response: ApiResponse<IAlbum[]>) => response.results as IAlbum[]),  // Map the response
                tap(console.log),  // Log the response
                catchError(this.handleError)  // Handle any errors
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
