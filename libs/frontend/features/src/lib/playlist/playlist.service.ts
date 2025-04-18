import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ICreatePlaylist, IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class PlaylistService {
    private playlistsSubject: BehaviorSubject<IPlaylist[]> = new BehaviorSubject<IPlaylist[]>([]);
    public playlists$: Observable<IPlaylist[]> = this.playlistsSubject.asObservable();
    endpoint = environment.dataApiUrl + '/playlist';

    constructor(private readonly http: HttpClient) {}

    public list(options?: any): Observable<IPlaylist[] | null> {
        return this.http
            .get<ApiResponse<IPlaylist[]>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IPlaylist[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getSongsByPlaylist(id: string, options?: any): Observable<ISong[]> {
        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results.songs as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public getPlaylistFromCreator(creator: string, options?: any): Observable<IPlaylist[]> {
        return this.http
            .get<ApiResponse<IPlaylist[]>>(this.endpoint, {
                params: { creator },
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results),
                tap((playlists: IPlaylist[]) => {
                    this.playlistsSubject.next(playlists);
                }),
                catchError(this.handleError)
            );
    }

    public read(id: string | null, options?: any): Observable<IPlaylist> {
        return this.http
            .get<ApiResponse<IPlaylist>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IPlaylist),
                catchError(this.handleError)
            );

    }

    public create(playlist: ICreatePlaylist, options?: any): Observable<IPlaylist> {
        return this.http.post<IPlaylist>(this.endpoint, playlist, { ...options, ...httpOptions }).pipe(
            map((response: any) => response.results),
            map((newPlaylist: IPlaylist) => {
                const currentPlaylists = this.playlistsSubject.value;
                this.playlistsSubject.next([...currentPlaylists, newPlaylist]);
                return newPlaylist;
            }),
            catchError(this.handleError)
        );
    }

    public parseDuration(duration: string): number {
        const [minutes, seconds] = duration.split(':').map(Number);
    
        if (isNaN(minutes) || isNaN(seconds)) {
            console.error('Invalid time:', duration);
            return 0;
        }
    
        return (minutes * 60) + seconds;
    }

    public addToPlaylist(playlist: IPlaylist, song: ISong, options?: any): Observable<IPlaylist> {
        playlist.songs.push(song);
        playlist.numberOfSongs++;
        const durationSeconds = this.parseDuration(song.duration);
        playlist.duration += durationSeconds;
        playlist.lastUpdated = new Date();

        return this.http.put<IPlaylist>(`${this.endpoint}/${playlist._id}`, playlist, { ...options, ...httpOptions }).pipe(
            tap(console.log),
            map((response: any) => response.results),
            catchError(this.handleError)
        );
    }

    public removeFromPlaylist(playlist: IPlaylist, song: ISong, options?: any): Observable<IPlaylist> {
        const index = playlist.songs.indexOf(song);
        if (index > -1) {
            playlist.songs.splice(index, 1);
            playlist.numberOfSongs--;
            playlist.duration -= this.parseDuration(song.duration);
            playlist.lastUpdated = new Date();
        }
        return this.http.put<IPlaylist>(`${this.endpoint}/${playlist._id}`, playlist, { ...options, ...httpOptions }).pipe(
            tap((response) => console.log(response)),
            map((response: any) => response.results),
            catchError(this.handleError)
        );
    }

    public update(playlist: IPlaylist): Observable<IPlaylist> {
        return this.http.put<ApiResponse<IPlaylist>>(`${this.endpoint}/${playlist._id}`, playlist).pipe(
            map((response: ApiResponse<IPlaylist>) => {
                const updatedPlaylist = response.results as IPlaylist;
                const currentPlaylists = this.playlistsSubject.value;
                const updatedPlaylists = currentPlaylists.map((p) => (p._id === updatedPlaylist._id ? updatedPlaylist : p));
                this.playlistsSubject.next(updatedPlaylists);
                return updatedPlaylist;
            })
        );
    }

    public delete(playlist: IPlaylist): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}/${playlist._id}`).pipe(
            tap(() => {
                const updatedPlaylists = this.playlistsSubject.value.filter((p) => p._id !== playlist._id);
                this.playlistsSubject.next(updatedPlaylists);
            }),
            catchError(this.handleError)
        );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in PlaylistService', error);

        return throwError(() => new Error(error.message));
    }
}
