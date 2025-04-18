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
    user: IUser | undefined;
    addedSong: ISong | null = null;

    constructor(private playlistService: PlaylistService, private loginService: LoginService, private songService: SongService) {}

    addToPlaylist(playlist: IPlaylist, song: ISong): void {
        if(playlist.creator == this.user) {
            this.songService.read(song._id).subscribe((result)=>{
            this.addedSong = result as ISong;
            if(this.addedSong && this.user){
                this.songService.putLikedSong(this.user, this.addedSong).subscribe();
        
                if (!playlist) {
                    console.error('Playlist not found');
                    return;
                }
        
                this.playlistService.addToPlaylist(playlist, this.addedSong).subscribe((results) => {
                        this.showToast(`Succesfully added ${this.addedSong?.title} to ${playlist.name}`);
                    },
                    (error) => {
                        this.showToast(`Error when adding ${this.addedSong?.title} to ${playlist.name}`);
                    }
                );
            }
        })
        }
        
        
        
    }

    removeFromPlaylist(playlist: IPlaylist, song: ISong): void {
        if(playlist.creator == this.user) {
            if (!playlist) {
            console.error('Playlist not found');
            return;
        }
        if(this.user) {
            this.songService.removeLikedSong(this.user, song).subscribe();
        this.playlistService.removeFromPlaylist(playlist, song).subscribe((results) => {
            this.songs = results.songs
            this.showToast(`Succesfully removed ${song.title} from ${playlist.name}`);
        });
        }
        }
        
        
    }

    ngOnInit(): void {
        
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;        
                this.subscription = this.playlistService.getPlaylistFromCreator(this.user._id).subscribe((results) => {
            if (results) {
                this.playlists = results;
            } else {
                console.error('Playlists not found');
            }
        });
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

    getRelationships(song: any): string[] {
        return song?.relationshipTypes || [];
    }

    getPascalCase(relationship: string): string {
        switch (relationship) {
            case 'SIMILAR_ARTIST':
              return 'Liked artist';
            case 'SIMILAR_GENRE':
              return 'Liked Genre';
            case 'SIMILAR_ALBUM':
              return 'Liked Album';
             default:
               return 'badge bg-secondary';
           }
    }
      
    getRelationshipColor(relationship: string): string {
      switch (relationship) {
        case 'SIMILAR_ARTIST':
          return 'badge bg-primary';
        case 'SIMILAR_GENRE':
          return 'badge bg-success';
        case 'SIMILAR_ALBUM':
          return 'badge bg-warning';
         default:
           return 'badge bg-secondary';
       }
    }
}
