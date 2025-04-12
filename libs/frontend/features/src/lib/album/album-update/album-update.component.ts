import { Component } from "@angular/core";
import { IAlbum, ISong } from "@avans-nx-songlibrary/api";
import { AlbumService } from "../album.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { SongService } from "../../song/song.service";

@Component({
    selector: 'album-update',
    templateUrl: './album-update.component.html'
})
export class AlbumUpdateComponent {//TODO update mooim maken
    album: IAlbum | null = null;
    songs: ISong[] | null = null;
    id: string | null = null;
    allSongs: ISong[] | null = null;
    selectedSong: ISong[] | undefined;


    constructor(private albumService: AlbumService, private songService: SongService, private route: ActivatedRoute, private location: Location, private router: Router) {}

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
        
        this.songService.list().subscribe((results) => {
            this.allSongs = results;
        })
    }

    
    addSelectedSong(songId: string): void {
        if (songId && this.allSongs) {
            const songToAdd = this.allSongs.find(song => song._id === songId);
            if (songToAdd && this.album) {
                songToAdd.album = this.album;
                this.songService.update(songToAdd).subscribe({
                    next: (updatedSong) => {
                        if (this.songs) {
                            this.songs = [...this.songs, updatedSong];
                        } else {
                            this.songs = [updatedSong];
                        }
                        this.allSongs = this.allSongs!.filter(song => song._id !== updatedSong._id);
                    },
                    error: (err) => {
                        console.error('Error with adding song to album:', err);
                    }
                });
            }
            const selectElement = document.querySelector('select');
            if (selectElement) {
                (selectElement as HTMLSelectElement).value = '';
            }
        }
    }

    removeSong(song: ISong) : void {
        song.album = null;
        this.songService.update(song).subscribe({
            next: (updatedSong) => {
            },
            error: (err) => {
                console.error('Error with removing song from album:', err);
            }
        });
    }

    deleteAlbum(): void {
        if(this.album){
            this.albumService.delete(this.album).subscribe({
                next: () => {
                    this.router.navigate(['homepage'])
                },
                error: (err) => {
                    console.error(err);
                }
            });

        }
    }
    


    onSubmit(): void {
        if (this.album) {
            this.albumService.update(this.album).subscribe({
                next: (data) => {
                            this.router.navigate(['/album', data._id]);
                        },
                        error: (err) => {
                            console.error('Error updating album: ', err);
                        }
                    });
        }
    }

    goBack(): void {
        this.location.back();
    }
}