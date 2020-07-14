import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';
import { IMemberDetails } from '../models/IMemberDetails';

export namespace MemberActions {
    export class FetchAll {
        static readonly type = '[MemberList] Fetch all members';
        constructor(public request: IListRequest) {}
    }
    export class FetchOne {
        static readonly type = '[MemberList] Fetch member';
        constructor(public memberId: number) {}
    }
    export class Select {
        static readonly type = '[MemberList] Select member';
        constructor(public memberId: number) {}
    }
    export class Save {
        static readonly type = '[MemberForm] Save member';
        constructor(public member: IMemberDetails) {}
    }
    export class Delete {
        static readonly type = '[MemberForm] Delete member';
        constructor(public memberId: number) {}
    }
    export class FetchMemberGroups {
        static readonly type = '[MemberForm] Fetch Member Groups';
    }
    export class SetViewState {
        static readonly type = '[Member] Set group view state';
        constructor(public newState: CrudStates) {}
    }
}
