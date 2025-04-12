import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IArtist, ICreateArtist } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class ArtistService {
    endpoint = environment.dataApiUrl + '/artist';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IArtist[] | null> {

        return this.http
            .get<ApiResponse<IArtist[]>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IArtist[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<IArtist> {
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

    public create(artist: ICreateArtist, options?: any): Observable<IArtist> {
        return this.http.post<IArtist>(this.endpoint, artist, {... options, ...httpOptions}).pipe(
            map((response: any) => response.results as IArtist),
            catchError(this.handleError)
        )
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in Artistservice', error);

        return throwError(() => new Error(error.message));
    }
}
