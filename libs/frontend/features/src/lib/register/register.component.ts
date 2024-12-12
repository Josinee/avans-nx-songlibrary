import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserIdentity, IUserInfo, IUserRegistration } from '@avans-nx-songlibrary/api';
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
    registerForm!: NgForm;
    

    constructor(private registerService: RegisterService, private router: Router) {};


    onSubmit(): void {
        const name = this.registerUser.name;
        const emailAddress = this.registerUser.emailAddress;
        const password = this.registerUser.password;
        this.registerService.register(name, emailAddress, password).subscribe((user: IUserIdentity) =>{
            if(user) {
                console.log('aangemaakt ',user);
                this.router.navigate(['login']);
            }else {
                console.error('Something went wrong');
            }
        })
    }

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
