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
export class HeaderComponent implements OnInit {
  loggedInUser: Observable<IUser | null> | undefined;
  
  constructor(private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.loggedInUser = this.loginService.currentUser;
    console.log(this.loggedInUser);
  }

  logout(): void {
    //this.loginService.logout();
  }
}
