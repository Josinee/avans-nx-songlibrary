import { forkJoin, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError, tap, mergeMap, filter } from 'rxjs/operators';
import { ApiResponse, IArtist, ISong } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class DiscoverService {
    endpoint = environment.rcmndApiUrl + '/songs';

    constructor(private readonly http: HttpClient, private artistService: ArtistService, private albumService: AlbumService) {}

    public list(song: string, options?: any): Observable<ISong[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<ISong[]>>(this.endpoint + `/${song}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as ISong[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    public matchSimilar(): void {
      this.http.get<ApiResponse<any[]>>(this.endpoint + '/match').subscribe({
        next: () => console.log('matched similar'),
        error: (err) => console.error('matching failed', err)
      });
    }

    public getRecommendationsForUser(user: string, options?: any): Observable<any[]> {
      return this.http
          .get<ApiResponse<any[]>>(this.endpoint + `/recommendations/${user}`, {
              ...options,
              ...httpOptions,
          })
          .pipe(
              map((response: any) => response),
              mergeMap((apiResponse: ApiResponse<any[]>) => {
                  const recommendations = apiResponse.results;
                  console.log('Recommendations from rcmnd API:', recommendations);
  
                  if (recommendations) {
                      const songRequests: Observable<any>[] = recommendations.map((rec) =>
                          forkJoin({
                            artist: rec.song.artist ? this.artistService.read(rec.song.artist) : of(null),
                            album: rec.song.album ? this.albumService.read(rec.song.album) : of(null),
                          }).pipe(
                              map(({ artist, album }) => ({
                                  song: { 
                                      _id: rec.song.id,
                                      title: rec.song.name,
                                      genre: rec.song.genre,
                                      artist: artist,
                                      album: album,
                                      duration: 0,
                                      songText: '',
                                  },
                                  relationshipTypes: rec.relationshipTypes,
                                  matchCount: rec.matchCount
                              }))
                          )
                          
                      );
                      return forkJoin(songRequests);
                  } else {

                      return [];
                  }
              }),
              tap(console.log),
              catchError(this.handleError)
          );
  }

      public getRelationshipsForSong(songId: string): Observable<any[]> {
        return this.http
          .get<any[]>(`${this.endpoint}/relationships/${songId}`)
          .pipe(
            map((relationships) => {
              return relationships.map(rel => ({
                type: rel.type,
                relatedSongId: rel.relatedSongId
              }));
            })
          );
      }
    

    public read(id: string | null, options?: any): Observable<IArtist> {
        console.log(`read ${this.endpoint}/${id}`);
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

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in DiscoverService', error);

        return throwError(() => new Error(error.message));
    }
}
