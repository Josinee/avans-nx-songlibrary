import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../song.service'
import { ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-songlibrary-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit, OnDestroy {
    songs: ISong[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private songService: SongService) {}

    ngOnInit(): void {
        this.subscription = this.songService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.songs = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
