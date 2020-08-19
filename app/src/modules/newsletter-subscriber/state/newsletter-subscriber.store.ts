import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    NewsletterSubscriberState,
    NewsletterSubscriberStateDefault,
} from './newsletter-subscriber.state';
import { NewsletterSubscriberApiService } from '../newsletter-subscriber-api.service';
import { NewsletterSubscriberActions } from './newsletter-subscriber.actions';
import { NewsletterSubscriber } from '../models/INewsletterSubscriber';
import { IListResponse } from '@core/models/IListResponse';
import { CrudStates, NotificationTypes } from '@core/enums';
import { NotificationService } from '@core/notification/notification.module';

@Injectable()
@State<NewsletterSubscriberState>({
    name: 'newsletterSubscriber',
    defaults: NewsletterSubscriberStateDefault,
})
export class NewsletterSubscriberStore {
    @Selector()
    static newsletterSubscribers$(state: NewsletterSubscriberState) {
        return state.newsletterSubscribers;
    }
    @Selector()
    static newsletterSubscribersCount$(state: NewsletterSubscriberState) {
        return state.newsletterSubscribersCount;
    }
    @Selector()
    static selectedNewsletterSubscriber$(state: NewsletterSubscriberState) {
        return state.selectedNewsletterSubscriber;
    }
    @Selector()
    static selectedNewsletterSubscriberId$(state: NewsletterSubscriberState) {
        return state.selectedNewsletterSubscriberId;
    }
    @Selector()
    static error$(state: NewsletterSubscriberState) {
        return state.error;
    }
    @Selector()
    static state$(state: NewsletterSubscriberState) {
        return state.viewState;
    }
    @Selector()
    static loading$(state: NewsletterSubscriberState) {
        return state.loading;
    }
    constructor(
        private newsletterSubscriberApiService: NewsletterSubscriberApiService,
        private notificationService: NotificationService,
    ) {}

    @Action(NewsletterSubscriberActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<NewsletterSubscriberState>,
        { request }: NewsletterSubscriberActions.FetchAll,
    ) {
        patchState({
            loading: true,
        });
        return this.newsletterSubscriberApiService.fetchAll(request).pipe(
            tap((res: IListResponse<NewsletterSubscriber>) => {
                patchState({
                    newsletterSubscribers: res.values,
                    newsletterSubscribersCount: res.totalCount,
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
                    message: 'Les souscriptions ne peuvent être chargées.',
                });
                return of(error);
            }),
        );
    }

    @Action(NewsletterSubscriberActions.Select)
    select(
        { patchState, getState }: StateContext<NewsletterSubscriberState>,
        { newsletterSubscriberId }: NewsletterSubscriberActions.Select,
    ) {
        const selectedNewsletterSubscriber = getState().newsletterSubscribers.find(
            (n) => n.id == newsletterSubscriberId,
        );
        patchState({
            selectedNewsletterSubscriberId: newsletterSubscriberId,
            selectedNewsletterSubscriber: selectedNewsletterSubscriber,
            viewState: CrudStates.Read,
        });
    }

    @Action(NewsletterSubscriberActions.Save)
    save(
        {
            dispatch,
            patchState,
            getState,
        }: StateContext<NewsletterSubscriberState>,
        { newsletterSubscriber }: NewsletterSubscriberActions.Save,
    ) {
        patchState({
            loading: true,
        });
        if (newsletterSubscriber.id) {
            return this.newsletterSubscriberApiService
                .update(newsletterSubscriber.id, newsletterSubscriber)
                .pipe(
                    tap((res: NewsletterSubscriber) => {
                        patchState({
                            selectedNewsletterSubscriberId: res.id,
                            selectedNewsletterSubscriber: res,
                            loading: false,
                            viewState: CrudStates.Read,
                        });
                        this.notificationService.notify({
                            type: NotificationTypes.Success,
                            message: 'La souscription a été modifiée.',
                        });
                        return dispatch(
                            new NewsletterSubscriberActions.FetchAll(
                                getState().request,
                            ),
                        );
                    }),
                    catchError((error: Error) => {
                        patchState({
                            error: error.message,
                            loading: false,
                        });
                        this.notificationService.notify({
                            type: NotificationTypes.Error,
                            message: "La souscription n'a pu être modifiée.",
                        });
                        return of(error);
                    }),
                );
        } else {
            newsletterSubscriber.id = -1;
            newsletterSubscriber.rowVersion = 0;
            return this.newsletterSubscriberApiService
                .create(newsletterSubscriber)
                .pipe(
                    tap((res: NewsletterSubscriber) => {
                        patchState({
                            selectedNewsletterSubscriberId: res.id,
                            selectedNewsletterSubscriber: res,
                            loading: false,
                            viewState: CrudStates.Read,
                        });
                        this.notificationService.notify({
                            type: NotificationTypes.Success,
                            message: 'La souscription a été créée.',
                        });
                        return dispatch(
                            new NewsletterSubscriberActions.FetchAll(
                                getState().request,
                            ),
                        );
                    }),
                    catchError((error: Error) => {
                        patchState({
                            error: error.message,
                            loading: false,
                        });
                        this.notificationService.notify({
                            type: NotificationTypes.Error,
                            message: "La souscription n'a pu être créée.",
                        });
                        return of(error);
                    }),
                );
        }
    }

    @Action(NewsletterSubscriberActions.Delete)
    delete(
        {
            patchState,
            dispatch,
            getState,
        }: StateContext<NewsletterSubscriberState>,
        { newsletterSubscriberId }: NewsletterSubscriberActions.Delete,
    ) {
        patchState({
            loading: true,
        });
        return this.newsletterSubscriberApiService
            .remove(newsletterSubscriberId)
            .pipe(
                tap(() => {
                    patchState({
                        selectedNewsletterSubscriberId: null,
                        selectedNewsletterSubscriber: null,
                        newsletterSubscribers: null,
                        newsletterSubscribersCount: null,
                        loading: false,
                        viewState: CrudStates.List,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Success,
                        message: 'La souscription a été supprimée.',
                    });
                    return dispatch(
                        new NewsletterSubscriberActions.FetchAll(
                            getState().request,
                        ),
                    );
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        loading: false,
                    });
                    this.notificationService.notify({
                        type: NotificationTypes.Error,
                        message: "La souscription n'a pu être supprimée.",
                    });
                    return of(error);
                }),
            );
    }
    @Action(NewsletterSubscriberActions.SetViewState)
    setViewState(
        { patchState }: StateContext<NewsletterSubscriberState>,
        { newState }: NewsletterSubscriberActions.SetViewState,
    ) {
        if (newState == CrudStates.Create) {
            patchState({
                viewState: newState,
                selectedNewsletterSubscriberId: null,
                selectedNewsletterSubscriber: null,
            });
        } else {
            patchState({
                viewState: newState,
            });
        }
    }
}
