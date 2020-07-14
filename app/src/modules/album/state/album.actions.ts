import { IAlbum } from './../models/IAlbum';
import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';

export namespace AlbumActions {
    export class FetchAll {
        static readonly type = '[AlbumList] Fetch all albums';
        constructor(public request: IListRequest) {}
    }
    export class Select {
        static readonly type = '[AlbumList] Select album';
        constructor(public albumId: number) {}
    }
    export class Save {
        static readonly type = '[AlbumForm] Save album';
        constructor(public album: IAlbum) {}
    }
    export class Delete {
        static readonly type = '[AlbumForm] Delete album';
        constructor(public albumId: number) {}
    }

    export class SetViewState {
        static readonly type = '[Album] Set view state';
        constructor(public newState: CrudStates) {}
    }
}
