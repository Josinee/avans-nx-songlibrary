import { IUser, IUserIdentity, IUserRegistration } from '@avans-nx-songlibrary/api';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class RegisterService {
    endpoint = environment.dataApiUrl + '/auth/register';

    constructor(private readonly http: HttpClient) {}

    public register(name: string, emailAddress: string, password: string, options?: any): Observable<IUserIdentity> {
        return this.http.post<IUserRegistration>(this.endpoint, { name, emailAddress, password }, { ...options, ...httpOptions }).pipe(
            map((response: any) => response.results),
            switchMap((createdUser: IUser) => {
                const user = {
                    id: createdUser._id,
                    username: createdUser.name
                };
            return this.http.post<void>(`${environment.rcmndApiUrl}/songs/user`, user, options).pipe(
                catchError(this.handleError) 
            )
            }),
            catchError(this.handleError)
            
        );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in RegisterService', error);

        return throwError(() => new Error(error.message));
    }
    
}


