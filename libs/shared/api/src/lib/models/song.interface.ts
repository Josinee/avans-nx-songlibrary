export interface ISong {
    id: string,
    title: string,
    length: number,
    songText: string,
    yearOfRelease: number
}


export type ICreateSong = Pick<ISong,'title' | 'length' | 'songText' | 'yearOfRelease'>;
export type IUpdateSong = Partial<Omit<ISong, 'id'>>;
export type IUpsertSong = ISong;
