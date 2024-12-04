import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {  constructor() {
  console.log('HeaderComponent loaded!');
}}
