import { IUser, IUserCredentials, IUserIdentity, IUserInfo, IUserRegistration } from '@avans-nx-songlibrary/api';
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

    // public currentUser = new BehaviorSubject<IUser| null>(null);
    // private readonly CURRENT_USER = 'currentuser';

    // endpoint = environment.dataApiUrl + '/login';

    // constructor(private readonly http: HttpClient) {}
    // login(email: string, password: string, options?: any): Observable<IUser> {
    //     console.log(`login at ${environment.dataApiUrl}login`);

    //     return this.http
    //     .post(this.endpoint, {email, password}, { 
    //         ...options,
    //         ...httpOptions,
    //     })
    //     .pipe(
    //         tap(console.log),
    //         map((response: any) => {
    //             const user = { ...response} as IUser;
    //             this.saveUserToLocalStorage(user);
    //             this.currentUser.next(user);
    //             //this.alertService.succes('You have been logged in');
    //             return user;
    //         },
    //         catchError(this.handleError)
    //     ));
    
    // }

    // getUserFromLocalStorage(): Observable<IUser> {
    //     const localUser = localStorage.getItem(this.CURRENT_USER);
    //     if(localUser) {
    //         return of(JSON.parse(localUser));
    //     }
    //     throw new Error('User not found in local storage');
        
    // }

    // private saveUserToLocalStorage(user: IUser): void {
    //     localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
    // }
    // public handleError(error: HttpErrorResponse): Observable<any> {
    //     console.log('handleError in MealService', error);

    //     return throwError(() => new Error(error.message));
    // }
    


    // onSubmit(): void{
    //     if(this.loginForm.valid)
    // }
}
