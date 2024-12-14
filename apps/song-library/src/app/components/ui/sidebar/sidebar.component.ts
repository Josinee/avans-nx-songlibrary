import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { IPlaylist, IUser } from '@avans-nx-songlibrary/api';
import { LoginService } from 'libs/frontend/features/src/lib/login/login.service';
import { PlaylistService } from 'libs/frontend/features/src/lib/playlist/playlist.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    public user: IUser | undefined;
    personalPlaylists: IPlaylist[] = []; // Store playlists here
    subscription: Subscription | undefined = undefined;


    constructor(private loginService: LoginService, private playlistService: PlaylistService, private router: Router) {}
    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            this.user = user;
        });
        this.subscription = this.playlistService.getPlaylistFromCreator(this.user!._id).subscribe(
            (playlists: IPlaylist[]) => {
              this.personalPlaylists = playlists;  // Assign the fetched playlists to the personalPlaylists array
            },
            (error) => {
              console.error('Error fetching playlists:', error);
            }
          );

        // Subscribe to playlists and update the component's playlist list whenever it changes
        this.subscription = this.playlistService.playlists$.subscribe(
          (playlists: IPlaylist[]) => {
            this.personalPlaylists = playlists;  // Update the playlist list whenever it changes
          }
        );
      }

    }


