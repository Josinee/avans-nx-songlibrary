import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ISong, IAlbum, IPlaylist, IUser } from '@avans-nx-songlibrary/api';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { ICreatePlaylist } from '@avans-nx-songlibrary/api';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'playlist-create',
    templateUrl: './playlist-create.component.html',
    styles: ``
})
export class PlaylistCreateComponent {
    user!: IUser;
    private sub: Subscription | null = null;
    playlist: ICreatePlaylist = {
        name: '',
        numberOfSongs: 0,
        duration: 0,
        creationDate: new Date(),
        creator: this.user,
        description: ' ',
        lastUpdated: new Date()
      };

    constructor(private playlistService: PlaylistService, private loginService: LoginService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        // Subscribe to the currentUser$ observable to get the logged-in user
        this.loginService.currentUser.subscribe(user => {
            if(user){

                this.user = user;
                console.log("init", this.user)
            }
        });
      }
    
    onSubmit(): void {
        this.playlist.creator = this.user;
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
