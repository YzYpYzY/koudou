import { IUser } from '@core/models/IUser';
import { IUserToken } from '../../models/IUserToken';

export interface ILoginResponse {
    user: IUser;
    token: IUserToken;
    currentProfil: string;
}
