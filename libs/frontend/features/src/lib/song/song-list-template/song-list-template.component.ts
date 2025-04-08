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
    addedSong: ISong | null = null;

    constructor(private playlistService: PlaylistService, private loginService: LoginService, private songService: SongService) {}

    addToPlaylist(playlist: IPlaylist, song: ISong): void {
        this.songService.read(song._id).subscribe((result)=>{
            this.addedSong = result as ISong;
            if(this.addedSong){
                console.log(this.addedSong._id, this.addedSong.album, this.addedSong.artist._id, this.addedSong.genre, this.addedSong.title, this.addedSong.duration, this.addedSong.songText)
                this.songService.putLikedSong(this.user, this.addedSong).subscribe();
        
                if (!playlist) {
                    console.error('Playlist not found');
                    return;
                }
        
                this.playlistService.addToPlaylist(playlist, this.addedSong).subscribe((results) => {
                        //this.songs = results.songs
                        this.showToast(`Succesfully added ${this.addedSong?.title} to ${playlist.name}`);
                    },
                    (error) => {
                        this.showToast(`Error when adding ${this.addedSong?.title} to ${playlist.name}`);
                    }
                );
            }
        })
        
        
    }

    removeFromPlaylist(playlist: IPlaylist, song: ISong): void {
        if (!playlist) {
            console.error('Playlist not found');
            return;
        }
        this.songService.removeLikedSong(this.user, song).subscribe();//TODO song uit liked songs halen behalve als het in een andere eigen playlist staat.
        this.playlistService.removeFromPlaylist(playlist, song).subscribe((results) => {
            this.songs = results.songs
            this.showToast(`Succesfully removed ${song.title} from ${playlist.name}`);
            // this.refreshSongList();
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

    refreshSongList(): void {
        if (this.playlist) {
            this.playlistService.getSongsByPlaylist(this.playlist._id).subscribe((results) => (this.songs = results));
        }
    }
}
