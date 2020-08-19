import { KoudouError } from '../core/models/KoudouError';
import { IUserToken } from '../core/models/IUserToken';
import { IUser } from '@core/models/IUser';
import { OptionModel } from 'yzy-ng';
import { ProfilState } from '../modules/auth/enum/ProfilState';

export interface KoudouState {
    isLogged: boolean;
    user: IUser;
    token: IUserToken;
    error: KoudouError;
    isDarkMode: boolean;
    sectionOptions: OptionModel[];
    loading: boolean;
    profilState: ProfilState;
}

export const KoudouStateDefault: KoudouState = {
    isLogged: false,
    user: null,
    token: null,
    error: null,
    isDarkMode: false,
    sectionOptions: null,
    loading: false,
    profilState: ProfilState.Profil,
};
