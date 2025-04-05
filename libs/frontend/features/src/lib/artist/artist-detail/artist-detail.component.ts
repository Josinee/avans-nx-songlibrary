import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistService } from '../artist.service';
import { IAlbum, IArtist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../album/album.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-artist-detail',
    templateUrl: './artist-detail.component.html',
    styleUrl: './artist-detail.component.css'
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
    activeTab: string = 'artist';
    id: string | null = null;
    artist: IArtist | null = null;
    songs: ISong[] | null = null;
    albums: IAlbum[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(
        private artistService: ArtistService,
        private songService: SongService,
        private albumService: AlbumService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
       
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            if (this.id) {
                this.artistService.read(this.id).subscribe((artist: IArtist) => {
                    if (artist) {
                        this.artist = artist;
                        const options = {
                            artist: this.artist!._id
                        };
                        this.subscription = this.songService.list(options).subscribe((results) => {
                   
                            this.songs = results;
                        });

                        this.subscription = this.albumService.list(options).subscribe((results) => {

                            this.albums = results;
                        });
                    } else {
                        console.error('Artist not found');
                    }
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    setTab(tabName: string): void {
        this.activeTab = tabName;
    }

    goBack(): void {
        this.location.back();
    }
}
