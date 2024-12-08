import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SongService } from '../song.service'
import { ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'song-list-template',
    template: `
    <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Song</th>
                <th scope="col">Artist</th>
                <th scope="col">Album</th>
                <th scope="col">Duration</th>
                </tr>
            </thead>

            <tbody>
                <tr *ngFor="let song of songs" class="song-row">
                <td><input type="checkbox" class="song-checkbox"></td>
                <td><a [routerLink]="['/song', song._id]">{{ song.title }}</a></td>
                <td><a [routerLink]="['/artist', song.artist._id]">{{ song.artist.name }}</a></td>
                <td><a [routerLink]="['/album', song.album?._id]">{{ song.album?.title }}, {{song.album?._id}}</a></td>
                <td>{{ song.duration / 100 | number: '1.2-3' }}</td>
                </tr>
            </tbody>
            </table>
`,

})
export class SongListTemplateComponent {
    @Input() songs: ISong[] = []
    
}
