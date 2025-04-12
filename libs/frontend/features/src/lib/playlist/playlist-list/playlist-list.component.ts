import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { IPlaylist, IUser } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'avans-nx-songlibrary-playlist-list',
    templateUrl: './playlist-list.component.html',

})
export class PlaylistListComponent implements OnInit, OnDestroy {
    playlists: IPlaylist[] | null = null;
    privatePlaylists: IPlaylist[] | null = null;
    user!: IUser;

    subscription: Subscription | undefined = undefined;

    constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router, private location: Location, private loginService: LoginService) {}

    ngOnInit(): void {
        this.subscription = this.playlistService.list().subscribe((results) => {
            this.playlists = results;
        });
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
            }
        });
        this.subscription = this.playlistService.getPlaylistFromCreator(this.user._id).subscribe((results) => {
            this.privatePlaylists = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    goBack(): void {
        this.location.back();
    }
}
