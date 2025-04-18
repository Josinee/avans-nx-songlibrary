import { Component } from '@angular/core';
import { IUserIdentity, IUserRegistration } from '@avans-nx-songlibrary/api';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',

})
export class RegisterComponent {
    registerUser: IUserRegistration = {
        emailAddress: '',
        password: '',
        name: ''
    };
    registerForm: NgForm | undefined;

    constructor(private registerService: RegisterService, private router: Router) {}

    onSubmit(): void {
        const name = this.registerUser.name;
        const emailAddress = this.registerUser.emailAddress;
        const password = this.registerUser.password;
        this.registerService.register(name, emailAddress, password).subscribe((user: IUserIdentity) => {
            if (user) {
                this.router.navigate(['login']); 
                
            } else {
                console.error('Something went wrong');
            }
        });
        
    }
}
