import { Component } from '@angular/core';
import { HeaderComponent } from '../ui/header/header.component';
import { AppComponent } from '../../app.component';

@Component({
  standalone: true,
  imports: [HeaderComponent],
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
    user = AppComponent.user;
  
}
