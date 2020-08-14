import { CrudStates } from '@core/enums';
import { IAlbum } from './../models/IAlbum';
import { IListRequest } from '@core/models/IListRequest';

export interface AlbumState {
    albums: IAlbum[];
    albumsCount: number;
    selectedAlbumId: number;
    selectedAlbum: IAlbum;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    isAlbumLoading: boolean;
}

export const AlbumStateDefault: AlbumState = {
    albums: null,
    albumsCount: 0,
    selectedAlbumId: null,
    selectedAlbum: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    isAlbumLoading: false,
};
