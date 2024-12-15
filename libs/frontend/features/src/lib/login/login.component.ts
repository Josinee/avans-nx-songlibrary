import { Component } from '@angular/core';
import { IUserCredentials } from '@avans-nx-songlibrary/api';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginUser: IUserCredentials = {
        emailAddress: '',
        password: ''
    };
    loginForm!: NgForm;
    error: string = '';

    constructor(private loginService: LoginService, private router: Router) {}

    onSubmit(): void {
        const emailAddress = this.loginUser.emailAddress;
        const password = this.loginUser.password;
        this.loginService.login(emailAddress, password).subscribe({
            next: (user) => {
                console.log('user = ', user);
                this.router.navigate(['homepage']);
            },
            error: (error: string) => {
                console.error('Error in component:', error);
                this.error = error;
            }
        });
    }
}
