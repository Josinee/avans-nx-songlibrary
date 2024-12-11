import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';



@Component({
  imports: [RouterOutlet, RouterLink, HeaderComponent, FooterComponent, SidebarComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  static user: IUser | null = null;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      if (user) {
        AppComponent.user = user;
        console.log(AppComponent.user);
        console.log('User is logged in:', user);
        this.router.navigate(['/homepage']);
      } else {
        console.log('No user logged in');
        this.router.navigate(['/login']);
      }
    });
  }
}
