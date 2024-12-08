import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { SongListComponent } from './song/song-list/song-list.component';
import { SongListTemplateComponent } from './song/song-list-template/song-list-template.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { SongService } from './song/song.service';
import { PlaylistService } from './playlist/playlist.service';
import { PlaylistCreateComponent } from './playlist/playlist-create/playlist-create.component';
import { PlaylistListComponent } from './playlist/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { ArtistService } from './artist/artist.service'
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { AlbumService } from './album/album.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,],
    declarations: [SongListComponent, SongListTemplateComponent, SongDetailComponent, ArtistDetailComponent, AlbumDetailComponent, PlaylistCreateComponent, PlaylistListComponent, PlaylistDetailComponent],
    providers: [SongService, ArtistService, AlbumService, PlaylistService],
    exports: [SongListComponent, SongListTemplateComponent, SongDetailComponent, ArtistDetailComponent, AlbumDetailComponent, PlaylistCreateComponent, PlaylistListComponent, PlaylistDetailComponent]

})
export class FeaturesModule {}


// export class FeaturesModule{}
// dit is gedaan in de les 20/11
