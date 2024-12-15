import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAlbum, IArtist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumDetailComponent } from '../../album/album-detail/album-detail.component';
import { AlbumService } from '../../album/album.service';
import { Location } from '@angular/common';

@Component({
    selector: 'new',
    templateUrl: './new.component.html',
    styleUrl: './new.component.css'
})
export class NewComponent implements OnInit, OnDestroy {
    activeTab: string = 'artist';
    id: string | null = null;
    artist: IArtist | null = null;
    songs: ISong[] | null = null;
    albums: IAlbum[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(

        private songService: SongService,
        private albumService: AlbumService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
        console.log('ja artist detail');
    }

    ngOnInit(): void {
        const dateRange = this.getDateRange('lastMonth');
        const options = {
            dateOfRelease: {
                startDate: dateRange.startDate
            }
        };
    
        this.albumService.list(options).subscribe((albums) => {
            this.albums = albums;
            console.log('Albums updated');
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

    onDateFilterChange(event: any) {
        const selectedFilter = event.target.value;
        const dateRange = this.getDateRange(selectedFilter);
    
        const options = {
            dateOfRelease: {
                startDate: dateRange.startDate
            }
        };
    
        // Pass only the startDate to the API
        this.albumService.list(options).subscribe((albums) => {
            this.albums = albums;
            console.log('Albums updated');
        });
    }

    getDateRange(filter: string): { startDate: Date } {
        const now = new Date();
        const startDate = new Date(now);
    
        switch (filter) {
            case 'lastWeek':
                startDate.setDate(now.getDate() - 7); // 7 days ago
                break;
            case 'lastMonth':
                startDate.setMonth(now.getMonth() - 1); // 1 month ago
                break;
            case 'lastYear':
                startDate.setFullYear(now.getFullYear() - 1); // 1 year ago
                break;
        }
    
        return { startDate };
    }

    goBack(): void {
        this.location.back(); // Navigate to the previous page
    }
}
