import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { SongListComponent } from './song/song-list/song-list.component';
import { SongListTemplateComponent } from './song/song-list-template/song-list-template.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SongService } from './song/song.service';
import { PlaylistService } from './playlist/playlist.service';
import { PlaylistCreateComponent } from './playlist/playlist-create/playlist-create.component';
import { PlaylistListComponent } from './playlist/playlist-list/playlist-list.component';
import { PlaylistListTemplateComponent } from './playlist/playlist-list-template/playlist-list-template.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { ArtistService } from './artist/artist.service'
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { AlbumService } from './album/album.service';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { RegisterService } from './register/register.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './users/user.service';
import { NewComponent } from './new/new/new.component';
import { DiscoverComponent } from './discover/discover/discover.component'
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    declarations: [SongListComponent, SongListTemplateComponent, SongDetailComponent, ArtistDetailComponent, AlbumDetailComponent, AlbumListComponent, PlaylistCreateComponent, PlaylistListComponent, PlaylistDetailComponent, LoginComponent, RegisterComponent, UserDetailComponent, NewComponent, DiscoverComponent, HomepageComponent, PlaylistListTemplateComponent],
    providers: [SongService, ArtistService, AlbumService, PlaylistService, LoginService, RegisterService, UserService],
    exports: [SongListComponent, SongListTemplateComponent, SongDetailComponent, ArtistDetailComponent, AlbumDetailComponent, AlbumListComponent, PlaylistCreateComponent, PlaylistListComponent, PlaylistDetailComponent, LoginComponent, RegisterComponent, UserDetailComponent, NewComponent, DiscoverComponent, HomepageComponent, PlaylistListTemplateComponent ]

})
export class FeaturesModule {}
