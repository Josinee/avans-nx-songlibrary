import { Component } from '@angular/core';
import { Genres, ISong, IArtist, IAlbum, AlbumType, ICreateAlbum } from '@avans-nx-songlibrary/api';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../artist/artist.service';
import { AlbumService } from '../../album/album.service';

@Component({
    selector: 'album-create',
    templateUrl: './album-create.component.html',//TODO alle kleuren matchen in het hele project good luck girl
    styleUrl: './album-create.component.css'
})
export class AlbumCreateComponent {
    album: ICreateAlbum = {
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
        type: AlbumType.Single
    }
    types = Object.values(AlbumType)
    artists: IArtist[] | null = null;
    genres = Object.values(Genres);
    


    constructor (private albumService: AlbumService, private songService: SongService, private artistService: ArtistService, private route: ActivatedRoute, private router: Router) {}
    ngOnInit(): void {
        this.artistService.list().subscribe((results) => {
            this.artists = results
        })
    }

    onSubmit(): void {
        if (this.album) {
            if(this.album.duration){
                this.album.duration = this.numberTimeToSeconds(this.album.duration);
            }
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

    numberTimeToSeconds = (time: number | string): number => {    
        const timeString = time.toString().padStart(6, '0');
        const timeParts = timeString.split(':');
        if (timeParts.length !== 3) {
            return NaN;
        }

        const hours = Number(timeParts[0]);
        const minutes = Number(timeParts[1]);
        const seconds = Number(timeParts[2]);
    
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            console.error('Invalid Time:', { hours, minutes, seconds });
            return NaN;
        }

        return (hours * 3600) + (minutes * 60) + seconds;
    }
      
      
      
    
}