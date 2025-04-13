import { Component } from '@angular/core';
import { Genres, ICreateSong, IArtist, IAlbum, AlbumType } from '@avans-nx-songlibrary/api';
import { SongService } from '../song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../artist/artist.service';
import { AlbumService } from '../../album/album.service';

@Component({
    selector: 'song-create',
    templateUrl: './song-create.component.html',
    styleUrl: './song-create.component.css'
})
export class SongCreateComponent {
    artists: IArtist[] | null = null;
    genres = Object.values(Genres);
    
    song: ICreateSong = {
        title: '',
        duration: '',
        artist: {
            _id: '',
            image: '',
            name: '',
            description: '',
            recordLabel: '',
            genres: []
        },
        genre: Genres.Blues,
        songText: '',
        album: undefined
    };
    albums!: IAlbum[] | null;

    constructor (private songService: SongService, private artistService: ArtistService, private albumService: AlbumService, private route: ActivatedRoute, private router: Router) {}
    ngOnInit(): void {
        this.artistService.list().subscribe((results) => {
            this.artists = results
        })
    }
    onArtistChange(): void {
        if (this.song.artist) {
            this.albumService.list({artist: this.song.artist._id}).subscribe((results) => {
                this.albums = results;
            });
        };
    }

    onSubmit(): void {
        if (this.song) {
            if (this.song.album?.title !== "") {
                this.songService.create(this.song).subscribe({
                    next: (data) => {
                        this.router.navigate(['/song', data._id]);
                    },
                    error: (err) => {
                        console.error('Error creating song: ', err);
                    }
                });
            } else {
                this.song.album = undefined;
                this.songService.create(this.song).subscribe({
                    next: (data) => {
                        this.router.navigate(['/song', data._id]);
                    },
                    error: (err) => {
                        console.error('Error creating song: ', err);
                    }
                });
            }
        }
    }


    
    
}