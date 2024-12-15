import { Component, Input } from '@angular/core';
import { SongService } from '../song.service';
import { IAlbum, IArtist, IPlaylist, ISong, IUser } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../../playlist/playlist.service';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'song-list-template',
    templateUrl: 'song-list-template.component.html',
    styleUrl: 'song-list-template.component.css'
})
export class SongListTemplateComponent {
    subscription: Subscription | undefined = undefined;
    @Input() songs: ISong[] | null = null;
    @Input() context: string | undefined;
    @Input() playlist?: IPlaylist;
    @Input() artist?: IArtist;
    @Input() album?: IAlbum;

    toastVisible: boolean = false;
    toastMessage: string = '';

    playlists: IPlaylist[] = [];
    user!: IUser;

    constructor(private playlistService: PlaylistService, private loginService: LoginService, private songService: SongService) {}

    addToPlaylist(playlist: IPlaylist, song: ISong): void {
        this.songService.putLikedSong(this.user, song).subscribe();
        
        if (!playlist) {
            console.error('Playlist not found');
            return;
        }


        this.playlistService.addToPlaylist(playlist, song).subscribe(
            (response) => {

                this.showToast(`Succesfully added ${song.title} to ${playlist.name}`);
            },
            (error) => {

                this.showToast(`Error when adding ${song.title} to ${playlist.name}`);
            }
        );
    }

    removeFromPlaylist(playlist: IPlaylist, song: ISong): void {
        if (!playlist) {
            console.error('Playlist not found');
            return;
        }

        this.playlistService.removeFromPlaylist(playlist, song).subscribe((results) => {

            this.showToast(`Succesfully removed ${song.title} from ${playlist.name}`);
        });
    }

    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;

            }
        });
        this.subscription = this.playlistService.getPlaylistFromCreator(this.user._id).subscribe((results) => {
            if (results) {

                this.playlists = results;
            } else {
                console.error('Playlists not found');
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    showToast(toastMessage: string) {
        this.toastMessage = toastMessage;
        this.toastVisible = true;

        setTimeout(() => {
            this.closeToast();
        }, 3000);
    }

    closeToast() {
        this.toastVisible = false;
    }
}
