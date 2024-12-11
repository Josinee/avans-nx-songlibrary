import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ISong, IAlbum, IPlaylist } from '@avans-nx-songlibrary/api';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { ICreatePlaylist } from '@avans-nx-songlibrary/api';

@Component({
    selector: 'playlist-create',
    templateUrl: './playlist-create.component.html',
    styles: ``
})
export class PlaylistCreateComponent {
    private sub: Subscription | null = null;
    playlist: ICreatePlaylist = {
        name: '',
        numberOfSongs: 0,
        duration: 0,
        creationDate: new Date(),
        description: ' ',
        lastUpdated: new Date()
      };

    constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router) {}

    
    onSubmit(): void {
        console.log('onSubmit', this.playlist);
        if (this.playlist) {
            this.playlistService.create(this.playlist).subscribe({
                next: (data) => {
                    console.log('Playlist created:', data);
                    this.router.navigate(['/playlist', data._id]);
                }, error: (err)=> {
                    console.error('Error creating playlist:', err)
                }
            })
        }
    }


}
