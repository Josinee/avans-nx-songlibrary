import { Component } from '@angular/core';
import { Genres, ICreateSong, IArtist, IAlbum, AlbumType, ICreateArtist } from '@avans-nx-songlibrary/api';
import { ArtistService } from '../artist.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'artist-create',
    templateUrl: './artist-create.component.html'
})
export class ArtistCreateComponent {//TODO MOOI MAKEN
    artist: ICreateArtist = {}
    genres = Object.values(Genres);

    constructor (private artistService: ArtistService, private route: ActivatedRoute, private router: Router) {}


    onSubmit(): void {
        if (this.artist) {
            
                this.artistService.create(this.artist).subscribe({
                    next: (data) => {
                        this.router.navigate(['/artist', data._id]);
                    },
                    error: (err) => {
                        console.error('Error creating artist: ', err);
                    }
                });
            
        }
    }
    
}