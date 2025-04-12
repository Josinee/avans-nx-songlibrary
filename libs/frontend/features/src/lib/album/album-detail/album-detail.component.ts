import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';
import { ISong, IAlbum } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { SongService } from '../../song/song.service';

@Component({
    selector: 'album-detail',
    templateUrl: './album-detail.component.html',
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
    album: IAlbum | null = null;
    songs: ISong[] | null = null;
    id: string | null = null;
    private sub: Subscription | null = null;

    constructor(private albumService: AlbumService, private songService: SongService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            if (this.id) {
                this.albumService.read(this.id).subscribe((album: IAlbum) => {
                    this.album = album;
                    if(album){
                        this.songService.list({album: this.album._id}).subscribe((results) => {
                            this.songs = results
                        });
                    }
                });
            }
        });
    }

        
    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    goBack(): void {
        this.location.back();
    }
}
