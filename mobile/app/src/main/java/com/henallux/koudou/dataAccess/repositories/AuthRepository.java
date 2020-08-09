package com.henallux.koudou.dataAccess.repositories;

import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.models.ChangePasswordModel;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.dataAccess.network.AuthService;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.RegisterModel;
import com.henallux.koudou.models.TokenModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthRepository extends BaseRepository{

    private static AuthRepository instance;
    private  AuthService authService;

    public static AuthRepository getInstance(App context){
        if(instance == null){
            instance = new AuthRepository(context);
        }
        return instance;
    }
    private AuthRepository(App context){
        super(context);
        authService = (AuthService) context.getService(AuthService.class);
    }

    public void authenticate(CredentialsModel model){

        authService.authenticate(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                if(response.isSuccessful()){
                    TokenModel model = response.body();
                    app.setToken(model);
                    successAction.setValue("Authenticate");
                } else {
                    treatError(response, "Authenticate", app.getString(R.string.error_authenticate_fail));
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                treatError(t, "Authenticate", app.getString(R.string.error_authenticate_fail));
            }
        });
    }

    public void register(RegisterModel model){
        authService.register(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                if(response.isSuccessful()){
                    TokenModel model = response.body();
                    app.setToken(model);
                    successAction.setValue("Register");
                } else {
                    treatError(response, "Register", app.getString(R.string.error_register_fail));
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                treatError(t,"Register", app.getString(R.string.error_register_fail));
            }
        });
    }

    public void refreshToken(RefreshTokenModel model){
        authService.refreshToken(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                if(response.isSuccessful()){
                    TokenModel model = response.body();
                    app.setToken(model);
                } else {
                    treatError(response,"RefreshToken", app.getString(R.string.error_refresh_token_fail));
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                treatError(t,"RefreshToken", app.getString(R.string.error_refresh_token_fail));
            }
        });
    }

    public void changePassword(ChangePasswordModel model){
        authService.changePassword(model).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                if(response.isSuccessful()){
                    successAction.setValue("ChangePassword");
                } else {
                    treatError(response,"ChangePassword", app.getString(R.string.error_password_change_fail));
                }
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                treatError(t,"ChangePassword",  app.getString(R.string.error_password_change_fail));
            }
        });
    }
}
