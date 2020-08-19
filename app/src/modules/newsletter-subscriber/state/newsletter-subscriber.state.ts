import { CrudStates } from '@core/enums';
import { NewsletterSubscriber } from './../models/INewsletterSubscriber';
import { IListRequest } from '@core/models/IListRequest';

export interface NewsletterSubscriberState {
    newsletterSubscribers: NewsletterSubscriber[];
    newsletterSubscribersCount: number;
    selectedNewsletterSubscriberId: number;
    selectedNewsletterSubscriber: NewsletterSubscriber;
    request: IListRequest;
    error: any;
    viewState: CrudStates;
    loading: boolean;
}

export const NewsletterSubscriberStateDefault: NewsletterSubscriberState = {
    newsletterSubscribers: null,
    newsletterSubscribersCount: 0,
    selectedNewsletterSubscriberId: null,
    selectedNewsletterSubscriber: null,
    request: null,
    error: null,
    viewState: CrudStates.List,
    loading: false,
};
