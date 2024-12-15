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
export class DiscoverComponent implements OnInit {
    songs: ISong[] = [];
    user!: IUser;
    constructor(private discoverService: DiscoverService, private loginService: LoginService, private albumService: AlbumService) {}

    ngOnInit(): void {
        this.loginService.currentUser.subscribe((user) => {
            if (user) {
                this.user = user;
                console.log('init', this.user);
            }
        });
        this.discoverService.getRecommendationsForUser(this.user._id).subscribe((songs) => {
            this.songs = songs || [];
        });
    }
}
