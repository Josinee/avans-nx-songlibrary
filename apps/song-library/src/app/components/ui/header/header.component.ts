import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';
import { Observable } from 'rxjs';

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
    this.loggedInUser = this.loginService.currentUser;
        this.loginService.currentUser.subscribe((user) => {
          this.user = user;
    
        });
  }

  logout(): void {
    //this.loginService.logout();
  }
}
