import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SongListComponent } from "@avans-nx-songlibrary/features"
import { ArtistDetailComponent } from "@avans-nx-songlibrary/features"

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboardcomponent" },
    { path: "dashboardcomponent", component: DashboardComponent },
    { path: "songListComponent", component: SongListComponent },
    { path: "artistDetailComponent", component: ArtistDetailComponent },
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
    { path: "**", redirectTo: "dashboard" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}