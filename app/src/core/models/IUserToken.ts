export interface IUserToken {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expires_in: number;
    expiration: string;
}
