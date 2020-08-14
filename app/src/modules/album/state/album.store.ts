import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlbumState, AlbumStateDefault } from './album.state';
import { AlbumApiService } from '../album-api.service';
import { AlbumActions } from './album.actions';
import { IAlbum } from '../models/IAlbum';
import { IListResponse } from '@core/models/IListResponse';

@Injectable()
@State<AlbumState>({
    name: 'album',
    defaults: AlbumStateDefault,
})
export class AlbumStore {
    @Selector()
    static albums$(state: AlbumState) {
        return state.albums;
    }
    @Selector()
    static albumsCount$(state: AlbumState) {
        return state.albumsCount;
    }
    @Selector()
    static selectedAlbum$(state: AlbumState) {
        return state.selectedAlbum;
    }
    @Selector()
    static selectedAlbumId$(state: AlbumState) {
        return state.selectedAlbumId;
    }
    @Selector()
    static error$(state: AlbumState) {
        return state.error;
    }
    @Selector()
    static state$(state: AlbumState) {
        return state.viewState;
    }
    @Selector()
    static isAlbumLoading$(state: AlbumState) {
        return state.isAlbumLoading;
    }
    constructor(private albumApiService: AlbumApiService) {}

    @Action(AlbumActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<AlbumState>,
        { request }: AlbumActions.FetchAll,
    ) {
        patchState({
            isAlbumLoading: true,
        });
        return this.albumApiService.fetchAll(request).pipe(
            tap((res: IListResponse<IAlbum>) => {
                patchState({
                    albums: res.values,
                    albumsCount: res.totalCount,
                    isAlbumLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isAlbumLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(AlbumActions.Select)
    select({ patchState }: StateContext<AlbumState>, { albumId }: AlbumActions.Select) {
        patchState({
            selectedAlbumId: albumId,
            selectedAlbum: null,
        });
    }

    @Action(AlbumActions.Save)
    save(
        { patchState }: StateContext<AlbumState>,
        { album }: AlbumActions.Save,
    ) {
        patchState({
            isAlbumLoading: true,
        });
        if (album.id) {
            return this.albumApiService.update(album.id, album).pipe(
                tap((res: IAlbum) => {
                    patchState({
                        selectedAlbumId: album.id,
                        selectedAlbum: res,
                        isAlbumLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isAlbumLoading: false,
                    });
                    return of(error);
                }),
            );
        } else {
            return this.albumApiService.create(album).pipe(
                tap((res: IAlbum) => {
                    patchState({
                        selectedAlbumId: album.id,
                        selectedAlbum: res,
                        isAlbumLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isAlbumLoading: false,
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(AlbumActions.Delete)
    delete(
        { patchState }: StateContext<AlbumState>,
        { albumId }: AlbumActions.Delete,
    ) {
        patchState({
            isAlbumLoading: true,
        });
        return this.albumApiService.remove(albumId).pipe(
            tap(() => {
                patchState({
                    selectedAlbumId: null,
                    selectedAlbum: null,
                    albums: null,
                    albumsCount: null,
                    isAlbumLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isAlbumLoading: false,
                });
                return of(error);
            }),
        );
    }
    @Action(AlbumActions.SetViewState)
    setViewState(
        { patchState }: StateContext<AlbumState>,
        { newState }: AlbumActions.SetViewState,
    ) {
        patchState({
            viewState: newState,
        });
    }
}
