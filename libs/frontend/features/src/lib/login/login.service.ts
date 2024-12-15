import { IUser } from '@avans-nx-songlibrary/api';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';
import { UserService } from '../users/user.service';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class LoginService {
    public currentUser = new BehaviorSubject<IUser | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';

    endpoint = environment.dataApiUrl + '/auth/login';

    constructor(private readonly http: HttpClient, private userService: UserService) {

        this.getUserFromLocalStorage();
    }

    login(emailAddress: string, password: string, options?: any): Observable<IUser> {
        console.log(`login at ${environment.dataApiUrl}login`);

        return this.http
            .post(
                this.endpoint,
                { emailAddress, password },
                {
                    ...options,
                    ...httpOptions
                }
            )
            .pipe(
                tap(console.log),

                map((response: any) => {

                    if (!response.results.token) {
                        this.handleError(response.results);
                        throw new Error(response.results.message);
                    }
                    const user = response.results as IUser;
                    this.saveUserToLocalStorage(user);
                    this.currentUser.next(user);


                    return user;
                }),
                catchError(this.handleError)
            );
    }

    getUserFromLocalStorage(): void {
        const localUser = localStorage.getItem(this.CURRENT_USER);
        if (localUser) {
            const user = JSON.parse(localUser);
            this.userService.read(user._id).subscribe((user) => {

                this.currentUser.next(user);
                return user;
            });
        }
    }

    private saveUserToLocalStorage(user: IUser): void {
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
    }
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
    
    public logout(): void {
        localStorage.removeItem(this.CURRENT_USER);
        this.currentUser.next(undefined);
    }
}
