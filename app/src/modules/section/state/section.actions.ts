import { ISection } from './../models/ISection';
import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';

export namespace SectionActions {
    export class FetchAll {
        static readonly type = '[SectionList] Fetch all sections';
        constructor(public request: IListRequest) {}
    }
    export class Select {
        static readonly type = '[SectionList] Select section';
        constructor(public sectionId: number) {}
    }
    export class Save {
        static readonly type = '[SectionForm] Save section';
        constructor(public section: ISection) {}
    }
    export class Delete {
        static readonly type = '[SectionForm] Delete section';
        constructor(public sectionId: number) {}
    }

    export class SetViewState {
        static readonly type = '[Section] Set view state';
        constructor(public newState: CrudStates) {}
    }
}
