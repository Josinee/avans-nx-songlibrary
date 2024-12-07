import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ISong, IAlbum, IPlaylist } from '@avans-nx-songlibrary/api';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { PlaylistService } from '../playlist.service';
import { ICreatePlaylist } from '@avans-nx-songlibrary/api';


@Component({
  selector: 'playlist-create',
  templateUrl: './playlist-create.component.html',
  styles: ``,
})

export class PlaylistCreateComponent {
  private sub: Subscription | null = null;
  playlist: ICreatePlaylist = {name: '', numberOfSongs: 0, duration: 0, creationDate: new Date()};
  
  
  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private router: Router) {}

  // createPlaylist(): void {
  //   this.playlistService.create(this.playlist).subscribe({
  //     next: ()
  //   })
  // }

  ngOnInit(): void {
    this.sub = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          if(!params.get('id')) {
            return of({
              name: '',
             
            });
          } else {
            return this.playlistService.read(params.get('id'));
          }
        }),
        tap(console.log)
      )
      .subscribe((playlist) => {
        this.playlist = playlist;
        
      })

  }

  onSubmit(): void {
    console.log('onSubmit', this.playlist);
    if(this.playlist) {
      console.log('update playlist');
     
    } else {
      this.playlistService
      .create(this.playlist).subscribe((data) => this.router.navigate(['..'], {relativeTo: this.route})//TODO mag niet ! gebruiken
  )
    }
  }
  
 
  // ngOnDestroy(): void {
  //   if (this.sub) {
  //     this.sub.unsubscribe();
  //   }
  // }
}
 