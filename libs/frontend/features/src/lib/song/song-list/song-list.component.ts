import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../song.service';
import { ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'song-list',
    templateUrl: './song-list.component.html',
})
export class SongListComponent implements OnInit, OnDestroy {
    songs: ISong[] = [];
    subscription: Subscription | undefined = undefined;

    constructor(private songService: SongService) {}

    ngOnInit(): void {
        this.subscription = this.songService.list().subscribe((results) => {
            this.songs = results || [];
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
