package com.henallux.koudou.dataAccess.network;

import android.content.Context;
import android.content.SharedPreferences;

import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.TokenModel;

import java.io.IOException;

import okhttp3.Authenticator;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.Route;
import retrofit2.Retrofit;

public class TokenAuthenticator implements Authenticator {
    private App context;
    private AuthService authService;
    public TokenAuthenticator(Context context) {
        this.context = (App) context;
        authService = (AuthService) ((App) context).getService(AuthService.class);
    }

    @Override
    public Request authenticate(Route route, Response response) throws IOException {

        String refreshToken = context.getStringSetting("refresh_token");

        retrofit2.Response<TokenModel> retrofitResponse = authService.RefreshToken(new RefreshTokenModel(refreshToken)).execute();

        if (retrofitResponse != null) {
            TokenModel model = retrofitResponse.body();
            context.setStringSetting("access_token", model.getAccess_token());
            context.setStringSetting("refresh_token", model.getRefresh_token());
            String newAccessToken = model.getAccess_token();

            return response.request().newBuilder()
                    .header("Authorization", "Bearer "+ newAccessToken)
                    .build();
        }
        return null;
    }
}