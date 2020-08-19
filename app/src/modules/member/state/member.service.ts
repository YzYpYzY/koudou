import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { MemberActions } from './member.actions';
import { MemberStore } from './member.store';
import { IMember } from '../models/IMember';
import { IMemberDetails } from '../models/IMemberDetails';

@Injectable({ providedIn: 'root' })
export class MemberService {
    @Select(MemberStore.members$)
    members$: Observable<IMember[]>;
    @Select(MemberStore.membersCount$)
    membersCount$: Observable<number>;
    @Select(MemberStore.selectedMember$)
    selectedMember$: Observable<IMemberDetails>;
    @Select(MemberStore.error$)
    error$: Observable<string>;
    @Select(MemberStore.state$)
    state$: Observable<CrudStates>;
    @Select(MemberStore.loading$)
    loading$: Observable<boolean>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new MemberActions.FetchAll(request));
    }

    fetchOne(memberId: number): void {
        this.store.dispatch(new MemberActions.FetchOne(memberId));
    }

    select(memberId: number, isRead: boolean): void {
        this.store.dispatch(new MemberActions.Select(memberId, isRead));
    }

    save(member: IMemberDetails): void {
        this.store.dispatch(new MemberActions.Save(member));
    }
    delete(memberId: number) {
        this.store.dispatch(new MemberActions.Delete(memberId));
    }

    setState(newState: CrudStates) {
        this.store.dispatch(new MemberActions.SetViewState(newState));
    }
}
