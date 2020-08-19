import { BaseModel } from '@core/base/base.model';
export class NewsletterSubscriber extends BaseModel {
    id: number;
    email: string;
    name: string;
}
