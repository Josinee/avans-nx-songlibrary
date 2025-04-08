import { Component, OnInit } from '@angular/core';
import { ISong, IUser } from '@avans-nx-songlibrary/api';
import { AlbumService } from '../../album/album.service';
import { DiscoverService } from '../discover.service';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'discover',
    templateUrl: './discover.component.html',
    styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit {//TODO tekst pagina aanpassen
    //TODO automatisch matchen op basis van genre artiest en album als er op de pagina wordt geklikt maybe? of om de zoveel tijd
    songs: ISong[] = [];
    user!: IUser;
    constructor(private discoverService: DiscoverService, private loginService: LoginService, private albumService: AlbumService) {}

    ngOnInit(): void {
        console.log("is this thing on??")
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
                console.log(user._id)
console.log('And this one?')
                this.discoverService.getRecommendationsForUser(this.user._id).subscribe((songs) => {
                    console.log("hier??/")
                    this.songs = songs || [];
                    console.log(songs);
                });
      }

        });

    }
}
