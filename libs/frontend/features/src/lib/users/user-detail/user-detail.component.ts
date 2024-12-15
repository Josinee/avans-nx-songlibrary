import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { UserService } from '../user.service';
import { IUser, UserGender } from '@avans-nx-songlibrary/api';

@Component({
    selector: 'user-details',
    templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
    user!: IUser;

    UserGender = UserGender;

    getEnumKeys(): (keyof typeof UserGender)[] {
        return Object.keys(UserGender) as (keyof typeof UserGender)[];
    }

    constructor(private loginService: LoginService, private userService: UserService) {}

    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
                console.log('init', this.user);
            }
        });
    }

    onSubmit() {
        console.log('Updated User Details:', this.user);

        this.userService.update(this.user).subscribe((user) => {
            this.user = user;
        });
    }
}
