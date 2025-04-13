import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { IPlaylist, IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';
import { PlaylistService } from 'libs/frontend/features/src/lib/playlist/playlist.service';
import { Subscription } from 'rxjs';

@Component({
    imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    public user: IUser | undefined;
    personalPlaylists: IPlaylist[] = [];
    subscription: Subscription | undefined = undefined;

    constructor(private loginService: LoginService, private playlistService: PlaylistService, private router: Router) {}
    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            this.user = user;
        });
        this.subscription = this.playlistService.getPlaylistFromCreator(this.user!._id).subscribe(
            (playlists: IPlaylist[]) => {
                this.personalPlaylists = playlists;
            },
            (error) => {
                console.error('Error fetching playlists:', error);
            }
        );

        this.subscription = this.playlistService.playlists$.subscribe((playlists: IPlaylist[]) => {
            this.personalPlaylists = playlists;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }
}
