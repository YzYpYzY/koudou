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
import { NotificationTypes, CrudStates } from '@core/enums';
import { NotificationService } from '@core/notification/notification.service';

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
    static loading$(state: MemberState) {
        return state.loading;
    }
    constructor(
        private memberApiService: MemberApiService,
        private notificationService: NotificationService,
    ) {}

    @Action(MemberActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<MemberState>,
        { request }: MemberActions.FetchAll,
    ) {
        patchState({
            loading: true,
        });
        return this.memberApiService.fetchAll(request).pipe(
            tap((res: IListResponse<IMember>) => {
                patchState({
                    members: res.values,
                    membersCount: res.totalCount,
                    loading: false,
                    request: { ...request },
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    loading: false,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Error,
                    message: 'Les membres ne peuvent être chargés.',
                });
                return of(error);
            }),
        );
    }

    @Action(MemberActions.Select)
    select(
        { patchState }: StateContext<MemberState>,
        { memberId, isRead }: MemberActions.Select,
    ) {
        return this.memberApiService.fetchOne(memberId.toString()).pipe(
            tap((res: IMemberDetails) => {
                patchState({
                    selectedMemberId: memberId,
                    selectedMember: res,
                    loading: false,
                    viewState: isRead ? CrudStates.Read : CrudStates.Update,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    loading: false,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Error,
                    message: "Ce membre n'a pu être chargé.",
                });
                return of(error);
            }),
        );
    }

    @Action(MemberActions.Save)
    save(
        { patchState, dispatch, getState }: StateContext<MemberState>,
        { member }: MemberActions.Save,
    ) {
        patchState({
            loading: true,
        });
        if (member.id) {
            return this.memberApiService.update(member.id, member).pipe(
                tap((res: IMemberDetails) => {
                    patchState({
                        selectedMemberId: member.id,
                        selectedMember: res,
                        loading: false,
                        viewState: CrudStates.Read,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Success,
                        message: 'Le membre a été modifié.',
                    });
                    return dispatch(
                        new MemberActions.FetchAll(getState().request),
                    );
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        loading: false,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Error,
                        message: "Le membre n'a pu être modifié.",
                    });
                    return of(error);
                }),
            );
        } else {
            member.id = -1;
            member.rowVersion = 0;
            return this.memberApiService.create(member).pipe(
                tap((res: IMemberDetails) => {
                    patchState({
                        selectedMemberId: member.id,
                        selectedMember: res,
                        loading: false,
                        viewState: CrudStates.Read,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Success,
                        message: 'Le membre a été créé.',
                    });
                    return dispatch(
                        new MemberActions.FetchAll(getState().request),
                    );
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        loading: false,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Error,
                        message: "Le membre n'a pu être créé.",
                    });
                    return of(error);
                }),
            );
        }
    }

    @Action(MemberActions.Delete)
    delete(
        { patchState, dispatch, getState }: StateContext<MemberState>,
        { memberId }: MemberActions.Delete,
    ) {
        patchState({
            loading: true,
        });
        return this.memberApiService.remove(memberId).pipe(
            tap(() => {
                patchState({
                    selectedMemberId: null,
                    selectedMember: null,
                    members: null,
                    membersCount: null,
                    loading: false,
                    viewState: CrudStates.List,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Success,
                    message: 'Le membre a été supprimé.',
                });
                return dispatch(new MemberActions.FetchAll(getState().request));
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    loading: false,
                });
                this.notificationService.notify({
                    type: NotificationTypes.Error,
                    message: "Le membre n'a pu être supprimé.",
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
        if (newState == CrudStates.Create) {
            patchState({
                viewState: newState,
                selectedMemberId: null,
                selectedMember: null,
            });
        } else {
            patchState({
                viewState: newState,
            });
        }
    }
}
