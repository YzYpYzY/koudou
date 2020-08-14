import { IUserToken } from '../core/models/IUserToken';
import { IUser } from '@core/models/IUser';
import { OptionModel } from 'yzy-ng';

export interface KoudouState {
    isLogged: boolean;
    user: IUser;
    token: IUserToken;
    currentProfil: string;
    error: any;
    isDarkMode: boolean;
    sectionOptions: OptionModel[];
}

export const KoudouStateDefault: KoudouState = {
    isLogged: false,
    user: null,
    token: null,
    currentProfil: null,
    error: null,
    isDarkMode: false,
    sectionOptions: null,
};
