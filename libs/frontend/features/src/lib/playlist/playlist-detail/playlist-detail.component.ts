import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlaylist, ISong, IUser } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist.service';
import { Location } from '@angular/common';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'playlist-detail',
    templateUrl: './playlist-detail.component.html'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
    playlist: IPlaylist | undefined;
    songs: ISong[] = [];
    user: IUser | undefined

    id: string | null = null;
    private sub: Subscription | null = null;
    constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router, private location: Location, private loginService: LoginService) {}

    ngOnInit(): void {
        
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
            }
        });
        
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            if (this.id) {
                this.playlistService.read(this.id).subscribe((playlist: IPlaylist) => {
                    if (playlist) {
                        this.playlist = playlist;
                        this.songs = playlist.songs;
                        console.log(this.user?._id)
                        console.log(this.playlist.creator)
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
        if(playlist.creator == this.user) {
            this.playlistService.delete(playlist).subscribe({
                next: () => {
                    this.router.navigate(['playlist-list']);
                },
                error: (err) => console.error('Failed to delete playlist', err)
            });
        }
        
    }
    
    updatePlaylist(): void {
        if(this.playlist && this.playlist.creator == this.user) {
            if (this.playlist) {
            this.playlistService.update(this.playlist).subscribe((updatedPlaylist) => {
                this.playlist = updatedPlaylist;
            });
        }
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
