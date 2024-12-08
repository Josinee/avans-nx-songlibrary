import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service'
import { IAlbum } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit, OnDestroy {
    albums: IAlbum[] | null = null;
    subscription: Subscription | undefined = undefined;


    constructor(private albumService: AlbumService) {
        console.log("ja album list");
    }

    ngOnInit(): void {
        this.subscription = this.albumService.list().subscribe((results: IAlbum[] | null) => {
            console.log(`results: ${results}`);
            this.albums = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
