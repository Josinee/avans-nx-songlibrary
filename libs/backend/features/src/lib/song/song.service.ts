import { Injectable, NotFoundException } from '@nestjs/common';
import { ISong } from '@avans-nx-songlibrary/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class SongService {
    TAG = 'SongService';

    private songs$ = new BehaviorSubject<ISong[]>([
        {
            id: '0',
            title: 'liedje',
            length: 3.5,
            songText: 'hoi hoi hoi',
            yearOfRelease: 2024,
        },
    ]);

    getAll(): ISong[] {
        Logger.log('getAll', this.TAG);
        return this.songs$.value;
    }

    getOne(id: string): ISong {
        Logger.log(`getOne(${id})`, this.TAG);
        const song = this.songs$.value.find((td) => td.id === id);
        if (!song) {
            throw new NotFoundException(`Song could not be found!`);
        }
        return song;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(song: Pick<ISong, 'title' | 'length' | 'songText' | 'yearOfRelease'>): ISong {
        Logger.log('create', this.TAG);
        const current = this.songs$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newSong: ISong = {
            ...song,
            id: `song-${Math.floor(Math.random() * 10000)}`,

        };
        this.songs$.next([...current, newSong]);
        return newSong;
    }
}
