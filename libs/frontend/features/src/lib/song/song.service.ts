import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ISong, IUser } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class SongService {
    endpoint = environment.dataApiUrl + '/song';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<ISong[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<ISong> {
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<ISong>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ISong),
                catchError(this.handleError)
            );
    }

    public getByAlbum(albumId: string | null, options?: any): Observable<ISong[]> {
        console.log(albumId + 'get by album in song service');
        if (albumId) {
        }
        return this.http
            .get<ApiResponse<ISong>>(`${environment.dataApiUrl}/album/${albumId}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as ISong[]),
                catchError(this.handleError)
            );
    }

    public putLikedSong(user: IUser, song: ISong, options?: any) {
        return this.http.put<void>(`${environment.rcmndApiUrl}/songs/${user._id}/${song._id}`, null).pipe(
            tap((response) => console.log('Response: ', response)),
            map((response: any) => response.results),
            catchError(this.handleError)
        );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}
