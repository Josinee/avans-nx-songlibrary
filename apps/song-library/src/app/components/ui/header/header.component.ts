import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';
import { Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';

@Component({
  imports: [CommonModule, RouterLink, RouterOutlet],
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public user: IUser | undefined;
   
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the currentUser$ observable
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;

    });
  }

  logout(): void {
    console.log('logout in headercomp');
    this.loginService.logout();
    //this.router.navigate(['/login']);
  }
}
