import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from '../ui/footer/footer.component';




@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
<app-footer></app-footer>`,
})
export class FooterLayoutComponent {
}
