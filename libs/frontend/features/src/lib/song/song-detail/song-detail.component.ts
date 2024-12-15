import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../song.service';
import { ActivatedRoute } from '@angular/router';
import { ISong, IAlbum } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'song-detail',
    templateUrl: './song-detail.component.html',
    styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit, OnDestroy {
    song: ISong | null = null;

    id: string | null = null;
    private sub: Subscription | null = null;

    constructor(private songService: SongService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            console.log(this.id);
            if (this.id) {
                console.log('ja');

                this.songService.read(this.id).subscribe((song: ISong) => {
                    console.log(song);
                    this.song = song;
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
        this.location.back(); // Navigate to the previous page
    }

    convertToMinutesAndSeconds(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} min and ${remainingSeconds} sec`;
    }
}
