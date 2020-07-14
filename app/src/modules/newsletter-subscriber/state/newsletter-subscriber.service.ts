import { CrudStates } from '@core/enums';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IListRequest } from '@core/models/IListRequest';
import { Store, Select } from '@ngxs/store';
import { NewsletterSubscriberActions } from './newsletter-subscriber.actions';
import { NewsletterSubscriberStore } from './newsletter-subscriber.store';
import { INewsletterSubscriber } from '../models/INewsletterSubscriber';

@Injectable({ providedIn: 'root' })
export class NewsletterSubscriberService {
    @Select(NewsletterSubscriberStore.newsletterSubscribers$)
    newsletterSubscribers$: Observable<INewsletterSubscriber[]>;
    @Select(NewsletterSubscriberStore.newsletterSubscribersCount$)
    newsletterSubscribersCount$: Observable<number>;
    @Select(NewsletterSubscriberStore.selectedNewsletterSubscriber$)
    selectedNewsletterSubscriber$: Observable<INewsletterSubscriber>;
    @Select(NewsletterSubscriberStore.error$)
    error$: Observable<string>;
    @Select(NewsletterSubscriberStore.state$)
    state$: Observable<CrudStates>;

    constructor(private store: Store) {}

    fetchAll(request: IListRequest): void {
        this.store.dispatch(new NewsletterSubscriberActions.FetchAll(request));
    }

    select(newsletterSubscriberId: number): void {
        this.store.dispatch(
            new NewsletterSubscriberActions.Select(newsletterSubscriberId),
        );
    }

    save(newsletterSubscriber: INewsletterSubscriber): void {
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
