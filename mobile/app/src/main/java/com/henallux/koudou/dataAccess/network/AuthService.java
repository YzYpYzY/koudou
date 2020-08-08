package com.henallux.koudou.dataAccess.network;

import com.henallux.koudou.models.ChangePasswordModel;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.RegisterModel;
import com.henallux.koudou.models.TokenModel;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface AuthService {
    @Headers({ "No-Retry-Auth: true" })
    @POST("api/1/Auth/Authenticate")
    Call<TokenModel> Authenticate(@Body CredentialsModel credentials);

    @Headers({ "No-Retry-Auth: true" })
    @POST("api/1/Auth/Register")
    Call<TokenModel> Register(@Body RegisterModel register);

    @Headers({ "No-Retry-Auth: true" })
    @POST("api/1/Auth/RefreshToken")
    Call<TokenModel> RefreshToken(@Body RefreshTokenModel refreshToken);

    @Headers({ "No-Retry-Auth: true" })
    @POST("api/1/Auth/ChangePassword")
    Call<Void> ChangePassword(@Body ChangePasswordModel changePassword);
}
