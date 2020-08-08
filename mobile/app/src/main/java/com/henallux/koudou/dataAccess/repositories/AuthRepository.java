package com.henallux.koudou.dataAccess.repositories;

import com.henallux.koudou.App;
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

    public void Authenticate(CredentialsModel model){

        authService.Authenticate(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                if(response.isSuccessful()){
                    TokenModel model = response.body();
                    context.setToken(model);
                    successAction.setValue("Authenticate");
                } else {
                    treatError(response, "Authenticate", "Connexion échouée.");
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                treatError(t, "Authenticate", "Connexion échouée.");
            }
        });
    }

    public void  Register(RegisterModel model){
        authService.Register(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                if(response.isSuccessful()){
                    TokenModel model = response.body();
                    context.setToken(model);
                    successAction.setValue("Register");
                } else {
                    treatError(response, "Register", "Inscription échouée.");
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                treatError(t,"Register", "Inscription échouée.");
            }
        });
    }

    public void  RefreshToken(RefreshTokenModel model){
        authService.RefreshToken(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                if(response.isSuccessful()){
                    TokenModel model = response.body();
                    context.setToken(model);
                } else {
                    treatError(response,"RefreshToken", "Renouvellement de la connexion échouée.");
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                treatError(t,"RefreshToken", "Renouvellement de la connexion échouée.");
            }
        });
    }

    public void  ChangePassword(ChangePasswordModel model){
        authService.ChangePassword(model).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                if(response.isSuccessful()){
                    successAction.setValue("ChangePassword");
                } else {
                    treatError(response,"ChangePassword", "La modification du mot de passe a échouée.");
                }
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                treatError(t,"ChangePassword", "La modification du mot de passe a échouée.");
            }
        });
    }
}
