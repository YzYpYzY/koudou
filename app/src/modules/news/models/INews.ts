import { BaseModel } from '@core/base/base.model';

export class INews extends BaseModel {
    title: string;
    date: string;
    creator: string;
    content: string;
}
