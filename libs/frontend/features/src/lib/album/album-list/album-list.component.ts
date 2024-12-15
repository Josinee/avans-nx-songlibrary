import { Component, Input } from '@angular/core';
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
    subscription: Subscription | undefined = undefined;

    constructor(private albumService: AlbumService) {
      
    }

    ngOnInit(): void {
        console.log('Albums received in AlbumListComponent:', this.albums);
    }
}
