import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../ui/header/header.component';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink, HeaderComponent],
    selector: 'app-root',
    template: `<app-header></app-header> <router-outlet></router-outlet>`
})
export class PublicLayoutComponent {}
