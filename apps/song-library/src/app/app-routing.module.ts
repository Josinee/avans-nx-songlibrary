import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PlaylistCreateComponent, SongDetailComponent, SongListComponent, PlaylistListComponent, PlaylistDetailComponent, AlbumListComponent, LoginComponent } from "@avans-nx-songlibrary/features"
import { ArtistDetailComponent } from "@avans-nx-songlibrary/features"
import { AlbumDetailComponent } from "@avans-nx-songlibrary/features"
import { FooterLayoutComponent } from "./components/layout/footer-layout-component"

import  { MainLayoutComponent } from './components/layout/main-layout-component'

export const routes: Routes = [
    { path: 'login', pathMatch: 'full', component: FooterLayoutComponent, children: [{ path: '', component: LoginComponent }]},
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '', component: MainLayoutComponent, children: [
          { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
          { path: 'song-list', pathMatch: 'full', component: SongListComponent },
          { path: 'album/:id', pathMatch: 'full', component: AlbumDetailComponent },
          { path: 'album-list', pathMatch: 'full', component: AlbumListComponent },
          { path: 'song/:id', pathMatch: 'full', component: SongDetailComponent },
          { path: 'artist/:id', pathMatch: 'full', component: ArtistDetailComponent },
          { path: 'playlist-list', pathMatch: 'full', component: PlaylistListComponent },
          { path: 'playlist-create', pathMatch: 'full', component: PlaylistCreateComponent },
          { path: 'playlist/:id', pathMatch: 'full', component: PlaylistDetailComponent },
        ]
    }
    ];

    //{ path: "users", pathMatch: "full", component: ListComponent },
    // users/new moet voor users/:id, omdat new anders als de id wordt gezien.
    // Volgorde is belangrijk in routing.
    // { path: "users/new", pathMatch: "full", component: EditComponent },
    // { path: "users/:id", pathMatch: "full", component: DetailComponent },
    // { path: "users/:id/edit", pathMatch: "full", component: EditComponent },
    // {
    //     path: "columns",
    //     component: ColumnsComponent,
    //     children: [
    //         { path: "new", pathMatch: "full", component: EditComponent },
    //         { path: ":id", pathMatch: "full", component: DetailComponent },
    //         { path: ":id/edit", pathMatch: "full", component: EditComponent },
    //     ],
    // },
    // Catch-all route: als er geen URL match is gaan we naar component-a (of dashboard, of naar 404)
    

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
