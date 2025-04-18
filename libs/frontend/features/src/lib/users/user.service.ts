import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-songlibrary/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-songlibrary/shared/util-env';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

@Injectable({ providedIn: 'root' })
export class UserService {
    endpoint = environment.dataApiUrl + '/user';

    constructor(private readonly http: HttpClient) {}

    public read(id: string | null, options?: any): Observable<IUser> {
        return this.http
            .get<ApiResponse<IUser>>(this.endpoint + `/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public update(user: IUser): Observable<IUser> {
        return this.http.put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user).pipe(
            map((response: ApiResponse<IUser>) => {
                const updatedUser = response.results as IUser;
                return updatedUser;
            })
        );
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}
