import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HeaderComponent } from './components/ui/header/header.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';

@Component({
    imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, SidebarComponent],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    static user: IUser | null = null;
    constructor(private loginService: LoginService, private router: Router) {}

    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                AppComponent.user = user;
                this.router.navigate(['/homepage']);
            } else {
                this.router.navigate(['/login']);
            }
        });
    }
}
