import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlaylist, ISong } from '@avans-nx-songlibrary/api';
import { Subscription } from 'rxjs';
import { SongService } from '../../song/song.service';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styles: ``,
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: IPlaylist | null = null;
  songs: ISong[] = [];

  id: string | null = null;
  private sub: Subscription | null = null;

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.playlistService.read(this.id).subscribe((playlist: IPlaylist) => {
          this.playlist = playlist;
          this.songs = playlist.songs
        })

      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}