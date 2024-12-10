import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from '../ui/footer/footer.component';
import { HeaderComponent } from '../ui/header/header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, HeaderComponent],
  selector: 'app-root',
  template: `<app-header></app-header>
             <router-outlet></router-outlet>
             <app-footer></app-footer>`,
})
export class PublicLayoutComponent {
}
