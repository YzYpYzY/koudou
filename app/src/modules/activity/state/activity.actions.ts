import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';
import { IFullActivity } from '../models/IFullActivity';

export namespace ActivityActions {
    export class FetchAll {
        static readonly type = '[ActivityList] Fetch all activitys';
        constructor(public request: IListRequest) {}
    }
    export class FetchOne {
        static readonly type = '[ActivityForm] Fetch one activity';
        constructor(public activityId: number) {}
    }
    export class Select {
        static readonly type = '[ActivityList] Select activity';
        constructor(public activityId: number) {}
    }
    export class Save {
        static readonly type = '[ActivityForm] Save activity';
        constructor(public activity: IFullActivity) {}
    }
    export class Delete {
        static readonly type = '[ActivityForm] Delete activity';
        constructor(public activityId: number) {}
    }

    export class SetViewState {
        static readonly type = '[Activity] Set view state';
        constructor(public newState: CrudStates) {}
    }
}
