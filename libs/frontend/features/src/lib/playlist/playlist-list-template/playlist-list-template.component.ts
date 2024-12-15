import { Component, Input } from '@angular/core';
import { ICreatePlaylist, IPlaylist, IUser } from '@avans-nx-songlibrary/api';

@Component({
    selector: 'playlist-list-template',
    templateUrl: './playlist-list-template.component.html',
    styleUrls: ['./playlist-list-template.component.css']
})
export class PlaylistListTemplateComponent {
    @Input() playlists: IPlaylist[] = []
}
