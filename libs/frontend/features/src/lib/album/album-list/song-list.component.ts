import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../album.service'
import { ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit, OnDestroy {
    songs: ISong[] | null = null;
    subscription: Subscription | undefined = undefined;
    x = 888.88;

    constructor(private songService: SongService) {
        console.log("ja song list");
    }

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
