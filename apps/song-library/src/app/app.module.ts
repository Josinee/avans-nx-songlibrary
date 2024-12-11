import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeaturesModule } from '@avans-nx-songlibrary/features'
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';
import { PublicLayoutComponent } from './components/layout/public-layout-component';
import { MainLayoutComponent } from './components/layout/main-layout-component';


@NgModule({
  declarations: [
    AppComponent, RouterModule, HeaderComponent, FooterComponent, HomepageComponent, SidebarComponent, PublicLayoutComponent, MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeaturesModule,
    HttpClientModule,
    RouterModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        console.log('AppModule loaded!');
      }
}