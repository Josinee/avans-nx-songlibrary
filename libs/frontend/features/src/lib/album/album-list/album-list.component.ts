import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'album-list',
    templateUrl: './album-list.component.html',
    styleUrl: './album-list.component.css'
})
export class AlbumListComponent {
    @Input() albums: IAlbum[] | null = null;
    //albums: IAlbum[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private albumService: AlbumService) {
        console.log('ja album list');
    }

    ngOnInit(): void {
        console.log('Albums received in AlbumListComponent:', this.albums);
    }

    // ngOnInit(): void {
    //     this.subscription = this.albumService.list().subscribe((results: IAlbum[] | null) => {
    //         console.log(`results: ${results}`);
    //         this.albums = results;
    //     });
    // }

    // ngOnDestroy(): void {
    //     if (this.subscription) this.subscription.unsubscribe();
    // }
}
