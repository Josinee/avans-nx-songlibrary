import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { UserService } from '../user.service';
import { IUpdateUser, IUser, UserGender } from '@avans-nx-songlibrary/api';

@Component({
    selector: 'user-details',
    templateUrl: './user-detail.component.html',
    styles: []
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
        // Save the updated details via an API or a service
        // Example: this.userService.updateUser(this.user).subscribe();\

        this.userService.update(this.user).subscribe((user) => {
            this.user = user;
        });
    }


}
