import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserCredentials } from '@avans-nx-songlibrary/api';

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
}
