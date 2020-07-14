import { CrudStates } from '@core/enums';
import { IMemberDetails } from './../models/IMemberDetails';
import { IMember } from '../models/IMember';
import { IListRequest } from '@core/models/IListRequest';

export interface MemberState {
    members: IMember[];
    membersCount: number;
    selectedMemberId: number;
    selectedMember: IMemberDetails;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    isMemberLoading: boolean;
}

export const MemberStateDefault = {
    members: null,
    membersCount: 0,
    selectedMemberId: null,
    selectedMember: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    isMemberLoading: false,
};
