import { Component, OnInit } from '@angular/core';
import { ISong, IUser } from '@avans-nx-songlibrary/api';
import { AlbumService } from '../../album/album.service';
import { DiscoverService } from '../discover.service';
import { LoginService } from '../../login/login.service';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'discover',
    templateUrl: './discover.component.html',
    styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit {//TODO tekst pagina aanpassen
    //TODO automatisch verwijderen zodra het is toegevoegd aan playlist
    //TODO als het nummer nog in een andere playlist staat niet verwijderen, anders wel
    songs: ISong[] = [];
    user!: IUser;
    subscription: Subscription = new Subscription;
    constructor(private discoverService: DiscoverService, private loginService: LoginService, private albumService: AlbumService) {}

    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
                this.loadSongs();
                const loadInterval = interval(5000).subscribe(() => {this.loadSongs();});

                this.subscription.add(loadInterval)
      }
    });

    }

    loadSongs(): void{
        this.discoverService.matchSimilar();
        this.discoverService.getRecommendationsForUser(this.user._id).subscribe((songs)=>{
            this.songs = songs || [];
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }
}
