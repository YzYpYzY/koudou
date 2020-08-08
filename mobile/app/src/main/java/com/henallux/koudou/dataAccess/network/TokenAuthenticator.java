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
    public TokenAuthenticator(Context context) {
        this.context = (App) context;
    }

    @Override
    public Request authenticate(Route route, Response response) throws IOException {
        String noRetryHeader = response.request().header("No-Retry-Auth");
        if(!"true".equals(noRetryHeader)) {
            String refreshToken = context.getStringSetting("refresh_token");

            AuthService authService = (AuthService) ((App) context).getService(AuthService.class);
            retrofit2.Response<TokenModel> retrofitResponse = authService.RefreshToken(new RefreshTokenModel(refreshToken)).execute();

            if (retrofitResponse != null) {
                TokenModel model = retrofitResponse.body();
                if(model != null){
                    context.setStringSetting("access_token", model.getAccess_token());
                    context.setStringSetting("refresh_token", model.getRefresh_token());
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