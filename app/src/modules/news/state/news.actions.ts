import { INews } from './../models/INews';
import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';

export namespace NewsActions {
    export class FetchAll {
        static readonly type = '[NewsList] Fetch all news';
        constructor(public request: IListRequest) {}
    }
    export class Select {
        static readonly type = '[NewsList] Select news';
        constructor(public newsId: number) {}
    }
    export class Save {
        static readonly type = '[NewsForm] Save news';
        constructor(public news: INews) {}
    }
    export class Delete {
        static readonly type = '[NewsForm] Delete news';
        constructor(public newsId: number) {}
    }

    export class SetViewState {
        static readonly type = '[News] Set view state';
        constructor(public newState: CrudStates) {}
    }
}
