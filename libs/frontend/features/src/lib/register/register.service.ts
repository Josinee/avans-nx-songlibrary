import { IUser, IUserCredentials, IUserInfo, IUserRegistration } from '@avans-nx-songlibrary/api';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IAlbum, ISong } from '@avans-nx-songlibrary/api';

import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env'

export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

@Injectable({providedIn: 'root'})
export class RegisterService {

    endpoint = environment.dataApiUrl + '/auth/register';

    constructor(private readonly http: HttpClient) {}


    public register(name: string, emailAddress: string, password: string, options?: any): Observable<IUserIdentity> {
        console.log(`create ${this.endpoint}`);
        return this.http
            .post<IUserRegistration>(this.endpoint, {name, emailAddress, password}, { ...options, ...httpOptions })
            .pipe(
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in RegisterService', error);

        return throwError(() => new Error(error.message));
    }

}