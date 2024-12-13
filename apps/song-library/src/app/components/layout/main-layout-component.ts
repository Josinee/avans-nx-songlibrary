import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../ui/header/header.component';
import { FooterComponent } from '../ui/footer/footer.component';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';


@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, SidebarComponent, HeaderComponent],
  selector: 'app-root',
  template: `<app-header></app-header>
<div class="row">
    <div class="col-auto">
        <app-sidebar></app-sidebar>
    </div>
    <div class="col">
        <router-outlet></router-outlet>
        
    </div>
    
    
</div>


 `,
})
export class MainLayoutComponent {
}
