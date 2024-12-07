import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaylistService } from '../playlist.service'
import { IPlaylist } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-songlibrary-playlist-list',
    templateUrl: './playlist-list.component.html',
    styleUrls: ['./playlist-list.component.css'],
})
export class PlaylistListComponent implements OnInit, OnDestroy {
    playlists: IPlaylist[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private playlistService: PlaylistService) {}

    ngOnInit(): void {
        this.subscription = this.playlistService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.playlists = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
