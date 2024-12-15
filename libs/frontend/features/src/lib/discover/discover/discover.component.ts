import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAlbum, IArtist, ISong, IUser } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumDetailComponent } from '../../album/album-detail/album-detail.component';
import { AlbumService } from '../../album/album.service';
import { Location } from '@angular/common';
import { DiscoverService } from '../discover.service';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'discover',
    templateUrl: './discover.component.html',
    styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit, OnDestroy {
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

    ngOnDestroy(): void {}

    goBack(): void {}
}
