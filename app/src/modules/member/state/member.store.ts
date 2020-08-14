import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MemberState, MemberStateDefault } from './member.state';
import { MemberApiService } from '../member-api.service';
import { MemberActions } from './member.actions';
import { IMember } from '../models/IMember';
import { IListResponse } from '@core/models/IListResponse';
import { IMemberDetails } from '../models/IMemberDetails';

@Injectable()
@State<MemberState>({
    name: 'member',
    defaults: MemberStateDefault,
})
export class MemberStore {
    @Selector()
    static members$(state: MemberState) {
        return state.members;
    }
    @Selector()
    static membersCount$(state: MemberState) {
        return state.membersCount;
    }
    @Selector()
    static selectedMember$(state: MemberState) {
        return state.selectedMember;
    }
    @Selector()
    static selectedMemberId$(state: MemberState) {
        return state.selectedMemberId;
    }
    @Selector()
    static error$(state: MemberState) {
        return state.error;
    }
    @Selector()
    static state$(state: MemberState) {
        return state.viewState;
    }
    @Selector()
    static isMemberLoading$(state: MemberState) {
        return state.isMemberLoading;
    }
    constructor(private memberApiService: MemberApiService) {}

    @Action(MemberActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<MemberState>,
        { request }: MemberActions.FetchAll,
    ) {
        patchState({
            isMemberLoading: true,
        });
        return this.memberApiService.fetchAll(request).pipe(
            tap((res: IListResponse<IMember>) => {
                patchState({
                    members: res.values,
                    membersCount: res.totalCount,
                    isMemberLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isMemberLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(MemberActions.FetchOne)
    fetchOne(
        { patchState }: StateContext<MemberState>,
        { memberId }: MemberActions.FetchOne,
    ) {
        patchState({
            isMemberLoading: true,
        });
        return this.memberApiService.fetchOne(memberId.toString()).pipe(
            tap((res: IMemberDetails) => {
                patchState({
                    selectedMember: res,
                    isMemberLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isMemberLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(MemberActions.Select)
    select({ patchState, dispatch }: StateContext<MemberState>, { memberId }: MemberActions.Select) {
        patchState({ selectedMemberId: memberId, selectedMember: null });
        if (memberId != null) {
            return dispatch(new MemberActions.FetchOne(memberId));
        }
        return null;
    }

    @Action(MemberActions.Save)
    save(
        { patchState }: StateContext<MemberState>,
        { member }: MemberActions.Save,
    ) {
        patchState({
            isMemberLoading: true,
        });
        if (member.id) {
            return this.memberApiService.update(member.id, member).pipe(
                tap((res: IMemberDetails) => {
                    patchState({
                        selectedMemberId: member.id,
                        selectedMember: res,
                        isMemberLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isMemberLoading: false,
                    });
                    return of(error);
                }),
            );
        } else {
            return this.memberApiService.create(member).pipe(
                tap((res: IMemberDetails) => {
                    patchState({
                        selectedMemberId: member.id,
                        selectedMember: res,
                        isMemberLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isMemberLoading: false,
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(MemberActions.Delete)
    delete(
        { patchState }: StateContext<MemberState>,
        { memberId }: MemberActions.Delete,
    ) {
        patchState({
            isMemberLoading: true,
        });
        return this.memberApiService.remove(memberId).pipe(
            tap(() => {
                patchState({
                    selectedMemberId: null,
                    selectedMember: null,
                    members: null,
                    membersCount: null,
                    isMemberLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isMemberLoading: false,
                });
                return of(error);
            }),
        );
    }
    @Action(MemberActions.SetViewState)
    setViewState(
        { patchState }: StateContext<MemberState>,
        { newState }: MemberActions.SetViewState,
    ) {
        patchState({
            viewState: newState,
        });
    }
}
