import { ClaimTypes } from '@core/enums/ClaimTypes';

export interface Nav {
    label: string;
    url: string;
    isActive: boolean;
    icon: string;
    claims: ClaimTypes[];
}
