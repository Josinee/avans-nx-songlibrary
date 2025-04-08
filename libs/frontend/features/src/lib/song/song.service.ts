import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { ApiResponse, ICreateSong, ISong, IUser } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';
import { PlaylistService } from '../playlist/playlist.service';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class SongService {
    endpoint = environment.dataApiUrl + '/song';

    constructor(private readonly http: HttpClient, private playlistService: PlaylistService) {}

    public list(options?: any): Observable<ISong[] | null> {
        console.log(`list ${this.endpoint}`);

        let params = new HttpParams();

        if (options?.artist) {
            const artist = options.artist
            params = params.append('artist', artist);
        }
        if (options?.album){
            const album = options.album
            params = params.append('album', album);
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
        console.log("Put liked song")
        console.log(user._id + "  " + song._id + song.title + song.genre + song.artist._id+ song.album)
        const body = {
            user: { id: user._id, username: user.name },
            song: { id: song._id, title: song.title, genre: song.genre, artist: song.artist._id, album: song.album },
        };
        console.log("body" +body.song.id)
        return this.http.put<void>(`${environment.rcmndApiUrl}/songs`, body, options).pipe(
            tap((response) => console.log('Response: ', response)),
            catchError(this.handleError)
        );
    }

    public removeLikedSong(user: IUser, song: ISong, options?: any): Observable<Observable<void> | []> {
        let songInOtherPlaylist = false;
        return this.playlistService.getPlaylistFromCreator(user._id).pipe(
            map(playlists => {
                playlists.forEach(playlist => {
                    if(playlist.songs && Array.isArray(playlist.songs)) {
                        playlist.songs.forEach(playlistSong=> {
                            const playlistSongId = (playlistSong as any);
                            if(playlistSongId === song._id){
                                songInOtherPlaylist = true;
                            }
                        })
                    }
                });
                if (!songInOtherPlaylist) {
                    return this.http.delete<void>(`${environment.rcmndApiUrl}/songs/${song._id}/${user._id}`);
                }
                return [];
            })
        );
    }


    public create(song: ICreateSong, options?: any): Observable<ISong> {
        console.log("Putsong")
        console.log(song.title + song.genre + song.artist._id+ song.album)
        return this.http.post<any>(this.endpoint, song, { ...options, ...httpOptions }).pipe(
          map((response: any) => response.results as ISong),
          switchMap((createdSong: ISong) => {
            const body = {
              song: {
                id: createdSong._id,
                title: createdSong.title,
                genre: createdSong.genre,
                artist: createdSong.artist,
                album: createdSong.album,
              },
            };
            return this.http.post<void>(`${environment.rcmndApiUrl}/songs`, body, options).pipe(
              tap((response) => console.log('Response: ', response)),
              map(() => createdSong),
              catchError(this.handleError)
            );
          }),
          catchError(this.handleError)
        );
      }
    
    public update(song: ISong, options?: any): Observable<ISong> {
        console.log("songservice front"+ song.album?.title)
        return this.http.put<ISong>(`${this.endpoint}/${song._id}`, song, { ...options, ...httpOptions }).pipe(
            map((response: any) => response.results as ISong),
            catchError(this.handleError)
        );

    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in songService', error);

        return throwError(() => new Error(error.message));
    }
}
