// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SongListComponent } from './song/song-list/song-list.component';
// import { SongDetailComponent } from './song/song-detail/song-detail.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// @NgModule({
//     imports: [CommonModule],
//     declarations: [SongListComponent, SongDetailComponent ],
//     exports: [SongListComponent, SongDetailComponent],
// })

// export class FeaturesModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song/song-list/song-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { SongService } from './song/song.service';
import { PlaylistService } from './playlist/playlist.service';

//import { BookFeaturedComponent } from './books/book-featured/book-featured.component';

// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [
        SongDetailComponent,
        SongListComponent,
        UserEditComponent,
        UserListComponent,
        UserDetailsComponent,

        //BookListComponent,
        //BookFeaturedComponent
    ],
    exports: [UserListComponent, UserDetailsComponent, UserEditComponent, SongListComponent],
    providers: [SongService, PlaylistService],

})
export class FeaturesModule {}

// @NgModule{{
//     imports: [ CommonModule, RouterModule, FormsModule],
//     declarations: [UserDetailsComponent, UserListComponent, UserEditComponent],
//     
// }}

// export class FeaturesModule{}
// dit is gedaan in de les 20/11
