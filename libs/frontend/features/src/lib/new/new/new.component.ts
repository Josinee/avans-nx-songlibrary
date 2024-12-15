import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAlbum, IArtist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
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

    constructor(private albumService: AlbumService, private location: Location) {}

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
                startDate.setDate(now.getDate() - 7);
                break;
            case 'lastMonth':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'lastYear':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        return { startDate };
    }

    goBack(): void {
        this.location.back();
    }
}
