import { YzYAction, YzYActionTypes } from 'yzy-ng';
import { ClaimTypes } from '@core/enums/ClaimTypes';
export class KoudouAction implements YzYAction {
    name: string;
    type?: YzYActionTypes;
    class?: string;
    disabled?: boolean;
    label?: string;
    hide?: boolean;
    claims?: ClaimTypes[];
}
