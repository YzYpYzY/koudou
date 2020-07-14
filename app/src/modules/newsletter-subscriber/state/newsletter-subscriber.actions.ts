import { INewsletterSubscriber } from './../models/INewsletterSubscriber';
import { CrudStates } from '@core/enums';
import { IListRequest } from '@core/models/IListRequest';

export namespace NewsletterSubscriberActions {
    export class FetchAll {
        static readonly type =
            '[NewsletterSubscriberList] Fetch all subscribers';
        constructor(public request: IListRequest) {}
    }
    export class Select {
        static readonly type = '[NewsletterSubscriberList] Select subscriber';
        constructor(public newsletterSubscriberId: number) {}
    }
    export class Save {
        static readonly type = '[NewsletterSubscriberForm] Save subscriber';
        constructor(public newsletterSubscriber: INewsletterSubscriber) {}
    }
    export class Delete {
        static readonly type = '[NewsletterSubscriberForm] Delete subscriber';
        constructor(public newsletterSubscriberId: number) {}
    }

    export class SetViewState {
        static readonly type = '[NewsletterSubscriber] Set view state';
        constructor(public newState: CrudStates) {}
    }
}
