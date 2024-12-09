import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { Form, NgForm } from '@angular/forms';

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
    constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router) {}

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
        console.log("eersts", playlist);
        this.playlistService.delete(playlist).subscribe({    
            next: () => {
                console.log('navigate');
                this.router.navigate(['playlist-list']);
                console.log(this.route)
            },
            error: (err) => console.error('Failed to delete playlist', err)
        });
    }
}
