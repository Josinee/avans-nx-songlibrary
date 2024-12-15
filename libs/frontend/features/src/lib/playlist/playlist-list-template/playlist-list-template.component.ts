import { Component, Input } from '@angular/core';
import { IPlaylist } from '@avans-nx-songlibrary/api';

@Component({
    selector: 'playlist-list-template',
    templateUrl: './playlist-list-template.component.html',
    styleUrls: ['./playlist-list-template.component.css']
})
export class PlaylistListTemplateComponent {
    @Input() playlists: IPlaylist[] = [];
}
