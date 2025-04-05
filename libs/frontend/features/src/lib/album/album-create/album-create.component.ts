import { Component } from '@angular/core';
import { Genres, ISong, IArtist, IAlbum, AlbumType } from '@avans-nx-songlibrary/api';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../artist/artist.service';
import { AlbumService } from '../../album/album.service';

@Component({
    selector: 'album-create',
    templateUrl: './album-create.component.html'
})
export class AlbumCreateComponent {
    album: IAlbum = {
        _id: '',
        title: '',
        image: '',
        duration: 0,
        dateOfRelease: new Date(),
        numberOfSongs: 0,
        genre: [],
        artist: {
            _id: '',
            image: '',
            name: '',
            description: '',
            recordLabel: '',
            genres: []
        },
        songs: [],
        type: AlbumType.Single
    }
    artists: IArtist[] | null = null;
    genres = Object.values(Genres);
    songs: ISong[] | undefined;
    


    constructor (private albumService: AlbumService, private songService: SongService, private artistService: ArtistService, private route: ActivatedRoute, private router: Router) {}
    ngOnInit(): void {
        this.artistService.list().subscribe((results) => {
            this.artists = results
        })
    }
    onArtistChange(): void {
        if (this.album.artist) {
            this.songService.list({artist: this.album.artist._id}).subscribe((results: any) => {
                this.songs = results;
            });
        };
    }

    onSubmit(): void {
        if (this.album) {
           
                this.albumService.create(this.album).subscribe({
                    next: (data) => {
                        this.router.navigate(['/album', data._id]);
                    },
                    error: (err) => {
                        console.error('Error creating album: ', err);
                    }
                });
           
        }
    }
    
}