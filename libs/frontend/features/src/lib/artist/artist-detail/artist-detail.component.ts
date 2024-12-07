import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistService } from '../artist.service'
import { IArtist } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-artist-detail',
    templateUrl: './artist-detail.component.html',

})
export class ArtistDetailComponent implements OnInit, OnDestroy {
    artist: IArtist[] | null = null;
    subscription: Subscription | undefined = undefined;


    constructor(private artistService: ArtistService) {
        console.log("ja artist detail");
    }

    ngOnInit(): void {
        this.subscription = this.artistService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.artist = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}

