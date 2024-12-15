import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { Location } from '@angular/common';

@Component({
    selector: 'playlist-detail',
    templateUrl: './playlist-detail.component.html'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
    playlist!: IPlaylist;
    songs: ISong[] = [];

    id: string | null = null;
    private sub: Subscription | null = null;
    constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router, private location: Location) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            if (this.id) {
                this.playlistService.read(this.id).subscribe((playlist: IPlaylist) => {
                    if (playlist) {
                        this.playlist = playlist;
                        this.songs = playlist.songs;
                    } else {
                        console.error('Playlist not found');
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

    deletePlaylist(playlist: IPlaylist): void {

        this.playlistService.delete(playlist).subscribe({
            next: () => {

                this.router.navigate(['playlist-list']);

            },
            error: (err) => console.error('Failed to delete playlist', err)
        });
    }
    updatePlaylist(): void {



        if (this.playlist) {


            this.playlistService.update(this.playlist).subscribe((updatedPlaylist) => {
                console.log('Updated Playlist from API:', updatedPlaylist);
                this.playlist = updatedPlaylist;
            });
        }
    }

    goBack(): void {
        this.location.back();
    }

    convertToMinutesAndSeconds(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} min and ${remainingSeconds} sec`;
    }
}
