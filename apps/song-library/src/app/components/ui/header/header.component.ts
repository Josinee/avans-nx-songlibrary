import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';

@Component({
    imports: [CommonModule, RouterLink, RouterOutlet],
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: ['header { background-color: whitesmoke}']
})
export class HeaderComponent {
    public user: IUser | undefined;

    constructor(private loginService: LoginService, private router: Router) {}
    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            this.user = user;
        });
    }

    logout(): void {
        console.log('logout in headercomp');
        this.loginService.logout();
        this.router.navigate(['/login']);
    }
}
