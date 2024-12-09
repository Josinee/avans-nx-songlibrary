import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SongService } from '../song.service'
import { IAlbum, IArtist, IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../../playlist/playlist.service';

@Component({
    selector: 'song-list-template',
    templateUrl:  'song-list-template.component.html',
    styleUrl: 'song-list-template.component.css'

})
export class SongListTemplateComponent {
    subscription: Subscription | undefined = undefined;
    @Input() songs: ISong[] | null = null;
    @Input() context: string | undefined
    @Input() playlist?: IPlaylist;
    @Input() artist?: IArtist;
    @Input() album?: IAlbum;

    playlists: IPlaylist[]= []

    constructor(private playlistService: PlaylistService) {}

    addToPlaylist(playlist : IPlaylist, song: ISong ): void{
        if(!playlist) {
            console.error("Playlist not found");
            return;
        }
        console.log("Adding song", song, " to playlist with  playlistId:", playlist);
        this.playlistService.addToPlaylist(playlist, song).subscribe(
            (response) => {
                console.log("Song added successfully:", response);
            },
            (error) => {
                console.error("Error adding song to playlist:", error);
            }
        );
    }

    removeFromPlaylist(playlist : IPlaylist, song: ISong): void {
        if(!playlist) {
            console.error("Playlist not found");
            return;
        }
        console.log("deleting song ", song._id);
        this.playlistService.removeFromPlaylist(playlist, song).subscribe((results)=>{
            console.log(results)
        })
    }

    ngOnInit(): void {
        this.subscription = this.playlistService.list().subscribe((results) => {
            if(results) {
                console.log(`results: ${results}`);
                this.playlists = results
            } else {
                console.error('Playlists not found')
            }
            
        });
    }



    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
    
}
