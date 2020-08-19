import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { NewsletterSubscriberActions } from './newsletter-subscriber.actions';
import { NewsletterSubscriberStore } from './newsletter-subscriber.store';
import { NewsletterSubscriber } from '../models/INewsletterSubscriber';

@Injectable({ providedIn: 'root' })
export class NewsletterSubscriberService {
    @Select(NewsletterSubscriberStore.newsletterSubscribers$)
    newsletterSubscribers$: Observable<NewsletterSubscriber[]>;
    @Select(NewsletterSubscriberStore.newsletterSubscribersCount$)
    newsletterSubscribersCount$: Observable<number>;
    @Select(NewsletterSubscriberStore.selectedNewsletterSubscriber$)
    selectedNewsletterSubscriber$: Observable<NewsletterSubscriber>;
    @Select(NewsletterSubscriberStore.error$)
    error$: Observable<string>;
    @Select(NewsletterSubscriberStore.state$)
    state$: Observable<CrudStates>;
    @Select(NewsletterSubscriberStore.loading$)
    loading$: Observable<boolean>;
    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new NewsletterSubscriberActions.FetchAll(request));
    }

    select(newsletterSubscriberId: number): void {
        this.store.dispatch(
            new NewsletterSubscriberActions.Select(newsletterSubscriberId),
        );
    }

    save(newsletterSubscriber: NewsletterSubscriber): void {
        this.store.dispatch(
            new NewsletterSubscriberActions.Save(newsletterSubscriber),
        );
    }
    delete(newsletterSubscriberId: number) {
        this.store.dispatch(
            new NewsletterSubscriberActions.Delete(newsletterSubscriberId),
        );
    }

    setState(newState: CrudStates) {
        this.store.dispatch(
            new NewsletterSubscriberActions.SetViewState(newState),
        );
    }
}
