import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { Form, NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'playlist-detail',
    templateUrl: './playlist-detail.component.html',
    styles: ``
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
        console.log('eersts', playlist);
        this.playlistService.delete(playlist).subscribe({
            next: () => {
                console.log('navigate');
                this.router.navigate(['playlist-list']);
                console.log(this.route);
            },
            error: (err) => console.error('Failed to delete playlist', err)
        });
    }
    updatePlaylist(): void {
        console.log('submit');
        console.log('this playlist ', this.playlist);

        if (this.playlist) {
            console.log('Form is valid, updating playlist:', this.playlist);

            this.playlistService.update(this.playlist).subscribe((updatedPlaylist) => {
                console.log('Updated Playlist from API:', updatedPlaylist);

                // Update the local playlist object with the updated one from the response
                this.playlist = updatedPlaylist; // Update the playlist with the new values

                // Optional: You can also update the list of playlists in the sidebar
                // if the component is using a playlist list
            });
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
