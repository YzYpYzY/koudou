import { BaseModel } from '@core/base/base.model';

export class IMemberDetails extends BaseModel {
    companyName: string;
    prefix: string;
    suffix: string;
    status: string;
    shortDescritpion?: string;
    longDescritpion?: string;
    groupId: number;
    email?: string;
}
