package com.henallux.koudou.dataAccess.network;

import android.content.Context;

import com.henallux.koudou.App;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.TokenModel;

import java.io.IOException;

import okhttp3.Authenticator;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.Route;

public class TokenAuthenticator implements Authenticator {
    private App app;
    public TokenAuthenticator(Context context) {
        this.app = (App) context;
    }

    @Override
    public Request authenticate(Route route, Response response) throws IOException {
        String noRetryHeader = response.request().header("No-Retry-Auth");
        if(!"true".equals(noRetryHeader)) {
            String refreshToken = app.getStringSetting("refresh_token");

            AuthService authService = (AuthService) ((App) app).getService(AuthService.class);
            retrofit2.Response<TokenModel> retrofitResponse = authService.refreshToken(new RefreshTokenModel(refreshToken)).execute();

            if (retrofitResponse != null) {
                TokenModel model = retrofitResponse.body();
                if(model != null){
                    app.setStringSetting("access_token", model.getAccess_token());
                    app.setStringSetting("refresh_token", model.getRefresh_token());
                    String newAccessToken = model.getAccess_token();

                    return response.request().newBuilder()
                            .header("Authorization", "Bearer " + newAccessToken)
                            .build();
                }
            }
        }
        return null;
    }
}