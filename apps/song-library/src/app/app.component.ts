import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeaturesModule } from '@avans-nx-songlibrary/features'

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FeaturesModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'song-library';
}
