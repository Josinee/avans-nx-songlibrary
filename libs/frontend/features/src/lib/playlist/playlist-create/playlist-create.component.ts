import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@avans-nx-songlibrary/api';
import { PlaylistService } from '../playlist.service';
import { ICreatePlaylist } from '@avans-nx-songlibrary/api';

@Component({
    selector: 'playlist-create',
    templateUrl: './playlist-create.component.html'
})
export class PlaylistCreateComponent {
    user!: IUser;
    playlist: ICreatePlaylist = {
        name: '',
        numberOfSongs: 0,
        duration: 0,
        creationDate: new Date(),
        description: ' ',
        lastUpdated: new Date(),
        public: false,
        image: ''
    };

    constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
                console.log('init', this.user);
            }
        });
    }

    onSubmit(): void {
        console.log('onSubmit', this.playlist);
        if (this.playlist) {
            this.playlistService.create(this.playlist).subscribe({
                next: (data) => {
                    console.log('Playlist created:', data);
                    this.router.navigate(['/playlist', data._id]);
                },
                error: (err) => {
                    console.error('Error creating playlist:', err);
                }
            });
        }
    }
}
