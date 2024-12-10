import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    }
    loginForm!: NgForm;

    constructor(
        private loginService: LoginService, private router: Router) {}

    onSubmit(): void {
        if (this.loginForm.valid) {
            const email = this.loginForm.value.emailAddress;
            const password = this.loginForm.value.password;
            this.loginService.login(email, password).subscribe((user) => {
                if(user) {
                    console.log("user = ", user);
                    this.router.navigate(['/']);
                }
            })
        }
    }
}
