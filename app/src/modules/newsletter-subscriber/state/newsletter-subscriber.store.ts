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
import { INewsletterSubscriber } from '../models/INewsletterSubscriber';
import { IListResponse } from '@core/models/IListResponse';

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
    static isNewsletterSubscriberLoading$(state: NewsletterSubscriberState) {
        return state.isNewsletterSubscriberLoading;
    }
    constructor(
        private newsletterSubscriberApiService: NewsletterSubscriberApiService,
    ) {}

    @Action(NewsletterSubscriberActions.FetchAll)
    fetchAll(
        { patchState }: StateContext<NewsletterSubscriberState>,
        { request }: NewsletterSubscriberActions.FetchAll,
    ) {
        patchState({
            isNewsletterSubscriberLoading: true,
        });
        return this.newsletterSubscriberApiService.fetchAll(request).pipe(
            tap((res: IListResponse<INewsletterSubscriber>) => {
                patchState({
                    newsletterSubscribers: res.values,
                    newsletterSubscribersCount: res.totalCount,
                    isNewsletterSubscriberLoading: false,
                });
            }),
            catchError((error: Error) => {
                patchState({
                    error: error.message,
                    isNewsletterSubscriberLoading: false,
                });
                return of(error);
            }),
        );
    }

    @Action(NewsletterSubscriberActions.Select)
    select(
        { patchState }: StateContext<NewsletterSubscriberState>,
        { newsletterSubscriberId }: NewsletterSubscriberActions.Select,
    ) {
        patchState({
            selectedNewsletterSubscriberId: newsletterSubscriberId,
            selectedNewsletterSubscriber: null,
        });
    }

    @Action(NewsletterSubscriberActions.Save)
    save(
        { patchState }: StateContext<NewsletterSubscriberState>,
        { newsletterSubscriber }: NewsletterSubscriberActions.Save,
    ) {
        patchState({
            isNewsletterSubscriberLoading: true,
        });
        if (newsletterSubscriber.id) {
            return this.newsletterSubscriberApiService
                .update(newsletterSubscriber.id, newsletterSubscriber)
                .pipe(
                    tap((res: INewsletterSubscriber) => {
                        patchState({
                            selectedNewsletterSubscriberId:
                                newsletterSubscriber.id,
                            selectedNewsletterSubscriber: res,
                            isNewsletterSubscriberLoading: false,
                        });
                    }),
                    catchError((error: Error) => {
                        patchState({
                            error: error.message,
                            isNewsletterSubscriberLoading: false,
                        });
                        return of(error);
                    }),
                );
        } else {
            return this.newsletterSubscriberApiService
                .create(newsletterSubscriber)
                .pipe(
                    tap((res: INewsletterSubscriber) => {
                        patchState({
                            selectedNewsletterSubscriberId:
                                newsletterSubscriber.id,
                            selectedNewsletterSubscriber: res,
                            isNewsletterSubscriberLoading: false,
                        });
                    }),
                    catchError((error: Error) => {
                        patchState({
                            error: error.message,
                            isNewsletterSubscriberLoading: false,
                        });
                        return of(error);
                    }),
                );
        }
    }

    @Action(NewsletterSubscriberActions.Delete)
    delete(
        { patchState }: StateContext<NewsletterSubscriberState>,
        { newsletterSubscriberId }: NewsletterSubscriberActions.Delete,
    ) {
        patchState({
            isNewsletterSubscriberLoading: true,
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
                        isNewsletterSubscriberLoading: false,
                    });
                }),
                catchError((error: Error) => {
                    patchState({
                        error: error.message,
                        isNewsletterSubscriberLoading: false,
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
        patchState({
            viewState: newState,
        });
    }
}
