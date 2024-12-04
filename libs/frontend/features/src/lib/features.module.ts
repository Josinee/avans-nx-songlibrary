import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song/song-list/song-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { SongService } from './song/song.service';
import { PlaylistService } from './playlist/playlist.service';
import { ArtistService } from './artist/artist.service'
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';



@NgModule({
    imports: [CommonModule],
    declarations: [SongListComponent, ArtistDetailComponent],
    providers: [SongService, ArtistService],
    exports: [SongListComponent, ArtistDetailComponent]

})
export class FeaturesModule {}


// export class FeaturesModule{}
// dit is gedaan in de les 20/11
