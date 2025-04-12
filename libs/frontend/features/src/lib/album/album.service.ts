import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IAlbum, ICreateAlbum} from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class AlbumService {
    endpoint = environment.dataApiUrl + '/album';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IAlbum[] | null> {
        let params = new HttpParams();

        if (options?.dateOfRelease?.startDate) {
            const startDate = options.dateOfRelease.startDate.toISOString();
            params = params.append('startDate', startDate);
        }
        if (options?.artist) {
            const artist = options.artist
            params = params.append('artist', artist);
        }

        return this.http
            .get<ApiResponse<IAlbum[]>>(this.endpoint, {
                params: params,
                observe: 'body',
                responseType: 'json'
            })
            .pipe(
                map((response: ApiResponse<IAlbum[]>) => response.results as IAlbum[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<IAlbum> {
        return this.http
            .get<ApiResponse<IAlbum>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IAlbum),
                catchError(this.handleError)
            );
    }

    public create(album: ICreateAlbum, options?: any): Observable<IAlbum> {
        return this.http.post<IAlbum>(this.endpoint, album, {... options, ...httpOptions}).pipe(
            map((response: any) => response.results as IAlbum),
            catchError(this.handleError)
        )
    }

    public update(album: IAlbum, options?: any): Observable<IAlbum> {
        return this.http.put<IAlbum>(`${this.endpoint}/${album._id}`, album, { ...options, ...httpOptions }).pipe(
            map((response: any) => response.results as IAlbum),
            catchError(this.handleError)
        );
    }

    public delete(album: IAlbum): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${[album._id]}`).pipe(
            tap(() => {
                console.log(`Album ${album._id} deleted successfully`)
            }),
            catchError(this.handleError)
        )
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in AlbumService', error);

        return throwError(() => new Error(error.message));
    }
}
