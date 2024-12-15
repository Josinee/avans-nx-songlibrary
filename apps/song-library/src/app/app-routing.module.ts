import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    HomepageComponent,
    PlaylistCreateComponent,
    SongDetailComponent,
    SongListComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    AlbumListComponent,
    LoginComponent,
    RegisterComponent,
    NewComponent,
    DiscoverComponent
} from '@avans-nx-songlibrary/features';
import { ArtistDetailComponent } from '@avans-nx-songlibrary/features';
import { AlbumDetailComponent } from '@avans-nx-songlibrary/features';
import { PublicLayoutComponent } from './components/layout/public-layout-component';
import { MainLayoutComponent } from './components/layout/main-layout-component';
import { UserDetailComponent } from '@avans-nx-songlibrary/features';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'homepage', pathMatch: 'full', component: HomepageComponent },
            { path: 'song-list', pathMatch: 'full', component: SongListComponent },
            { path: 'album/:id', pathMatch: 'full', component: AlbumDetailComponent },
            { path: 'album-list', pathMatch: 'full', component: AlbumListComponent },
            { path: 'song/:id', pathMatch: 'full', component: SongDetailComponent },
            { path: 'artist/:id', pathMatch: 'full', component: ArtistDetailComponent },
            { path: 'playlist-list', pathMatch: 'full', component: PlaylistListComponent },
            { path: 'playlist-create', pathMatch: 'full', component: PlaylistCreateComponent },
            { path: 'playlist/:id', pathMatch: 'full', component: PlaylistDetailComponent },
            { path: 'user-detail/:id', pathMatch: 'full', component: UserDetailComponent },
            { path: 'new', pathMatch: 'full', component: NewComponent },
            { path: 'discover', pathMatch: 'full', component: DiscoverComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
