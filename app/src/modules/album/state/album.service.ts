import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { AlbumActions } from './album.actions';
import { AlbumStore } from './album.store';
import { IAlbum } from '../models/IAlbum';

@Injectable({ providedIn: 'root' })
export class AlbumService {
    @Select(AlbumStore.albums$)
    albums$: Observable<IAlbum[]>;
    @Select(AlbumStore.albumsCount$)
    albumsCount$: Observable<number>;
    @Select(AlbumStore.selectedAlbum$)
    selectedAlbum$: Observable<IAlbum>;
    @Select(AlbumStore.error$)
    error$: Observable<string>;
    @Select(AlbumStore.state$)
    state$: Observable<CrudStates>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new AlbumActions.FetchAll(request));
    }

    select(albumId: number): void {
        this.store.dispatch(new AlbumActions.Select(albumId));
    }

    save(album: IAlbum): void {
        this.store.dispatch(new AlbumActions.Save(album));
    }
    delete(albumId: number) {
        this.store.dispatch(new AlbumActions.Delete(albumId));
    }

    setState(newState: CrudStates) {
        this.store.dispatch(new AlbumActions.SetViewState(newState));
    }
}
