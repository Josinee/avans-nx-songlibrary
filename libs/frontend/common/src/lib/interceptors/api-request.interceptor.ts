// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { UnauthorizedException } from '@nestjs/common';

// @Injectable()
// export class ApiRequestInterceptor implements HttpInterceptor {

//     private readonly CURRENT_USER = 'currentuser';
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
//         const currentUser = localStorage.getItem(this.CURRENT_USER);
//         if(!currentUser) {
//             throw new UnauthorizedException();
//         }
//         const user = JSON.parse(currentUser);
//         const token = user.token;
    
//         request = request.clone({
//             setHeaders: {
//                 Authorization: 'Bearer ' + token
//             }
//         });
        
//         return next.handle(request);
//     }
// }
// // import { HttpInterceptor } from '@angular/common/http';
// // import { Injectable,  ExecutionContext, CallHandler, UnauthorizedException,} from '@nestjs/common';
// // import { Observable } from 'rxjs';
// // import { map } from 'rxjs/operators';

// // @Injectable()
// // export class ApiRequestInterceptor implements HttpInterceptor {

// //     private readonly CURRENT_USER = 'currentuser';

// //     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
// //         const currentUser = localStorage.getItem(this.CURRENT_USER);
// //         const user = JSON.parse(currentUser);
// //         const req = context.switchToHttp().getRequest();
// //         const authHeader = req.headers.authorization;

// //         const token = user.token;


// //         req.headers['authorization'];
// //         this.httpS
// //         return next.handle();
        
    
// //     }
// // }

