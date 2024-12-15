import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';
import { ISong, IAlbum } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { Location, PathLocationStrategy } from '@angular/common';
import { SongService } from '../../song/song.service';

@Component({
    selector: 'album-detail',
    templateUrl: './album-detail.component.html',
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
    album: IAlbum | null = null;
    songs: ISong[] = [];
    id: string | null = null;
    private sub: Subscription | null = null;

    constructor(private albumService: AlbumService, private route: ActivatedRoute, private location: Location, private songService: SongService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            console.log(this.id);
            if (this.id) {
                // Fetch the album first
                this.albumService.read(this.id).subscribe((album: IAlbum) => {
                    console.log(album);
                    this.album = album;
    
                    // Fetch the songs after the album is loaded
                    this.songService.getByAlbum(this.id).subscribe((songs: ISong[]) => {
                        console.log(songs);
                        this.songs = songs;
                    }, (error) => {
                        console.error('Failed to fetch songs:', error);
                        this.songs = []; // Handle errors if fetching songs fails
                    });
                }, (error) => {
                    console.error('Failed to fetch album:', error);
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
