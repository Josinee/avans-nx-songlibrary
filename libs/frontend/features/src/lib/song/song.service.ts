import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICreateSong, ISong, IUser } from '@avans-nx-songlibrary/api';
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

        let params = new HttpParams();

        if (options?.artist) {
            const artist = options.artist
            params = params.append('artist', artist);
        }

        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint, {
                params: params,
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
        const body = {
            user: { id: user._id, username: user.name },
            song: { id: song._id, title: song.title, genre: song.genre, artist: song.artist._id, album: song.album._id },
        };
    
        return this.http.put<void>(`${environment.rcmndApiUrl}/songs`, body, options).pipe(
            tap((response) => console.log('Response: ', response)),
            catchError(this.handleError)
        );
    }

    public create(song: ICreateSong, options?: any): Observable<ISong> {
        return this.http.post<ISong>(this.endpoint, song, { ... options, ...httpOptions}).pipe(
            map((response: any) => response.results as ISong),
            catchError(this.handleError)
        )
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in songService', error);

        return throwError(() => new Error(error.message));
    }
}
