import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserRegistration } from '@avans-nx-songlibrary/api';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerUser: IUserRegistration = {
        emailAddress: '',
        password: '',
        name: ''
    }
    loginForm!: NgForm;

    constructor(
        private registerService: RegisterService, private router: Router) {}

    // onSubmit(): void {
    //     if (this.loginForm.valid) {
    //         const email = this.loginForm.value.emailAddress;
    //         const password = this.loginForm.value.password;
    //         this.loginService.login(email, password).subscribe((user) => {
    //             if(user) {
    //                 console.log("user = ", user);
    //                 this.router.navigate(['/']);
    //             }
    //         })
    //     }
    // }
}
