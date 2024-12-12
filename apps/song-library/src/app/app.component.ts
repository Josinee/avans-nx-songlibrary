import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';



@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, FooterComponent, SidebarComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'song-library';
}
