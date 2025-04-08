import { forkJoin, Observable, throwError } from 'rxjs';
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

    public getRecommendationsForUser(user: string, options?: any): Observable<ISong[]> {
        console.log('Hello?')
        return this.http
          .get<ApiResponse<any[]>>(this.endpoint + `/recommendations/${user}`, {
            ...options,
            ...httpOptions,
            
          })
          
          .pipe(
            map((response: any) => response), // Extraheer de body (ApiResponse)
            mergeMap((apiResponse: ApiResponse<any[]>) => {
              const recommendations = apiResponse.results;
              console.log('Recommendations from rcmnd API:', recommendations);
            if(recommendations){
                console.log('Hello?')
              const songRequests: Observable<ISong>[] = recommendations.map((rec) =>
                forkJoin({
                  artist: this.artistService.read(rec.artist),
                  album: this.albumService.read(rec.album ?? ''),
                }).pipe(
                  map(({ artist, album }) => ({
                      _id: rec.id,
                      title: rec.name,
                      genre: rec.genre,
                      artist: artist,
                      album: album,
                      duration: 0,
                      songText: '',
                  } as unknown as ISong))
                )
              );
              console.log("ja huh waarom doet ie het dan niet")
              return forkJoin(songRequests);
            } else {
                console.log("niet hier toch")
                return ['niet gelukt'];
            }
            }),
            tap(console.log),
            catchError(this.handleError)
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
