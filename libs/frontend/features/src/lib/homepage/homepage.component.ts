import { Component } from '@angular/core';
import { AlbumService } from '../album/album.service';
import { IAlbum, IPlaylist, IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from '../login/login.service';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {
    playlists: IPlaylist[] = [];
    personalPlaylists: IPlaylist[] = [];
    albums: IAlbum[] | null = null;
    user!: IUser;

    constructor(private albumService: AlbumService, private loginService: LoginService, private playlistService: PlaylistService) {}
    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;

            }
        });

        const now = new Date();
        const startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        const options = {
            dateOfRelease: {
                startDate: startDate
            }
        };

        this.albumService.list(options).subscribe((albums) => {
            this.albums = albums!.slice(0, 4);
        });

        this.playlistService.list().subscribe((results) => {
            this.playlists = results!.slice(0, 4);
        });

        this.playlistService.getPlaylistFromCreator(this.user._id).subscribe((results) => {
            this.personalPlaylists = results.slice(0, 4);
        });
    }
}
