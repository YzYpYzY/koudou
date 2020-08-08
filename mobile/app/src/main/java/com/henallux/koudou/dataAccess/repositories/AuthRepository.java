package com.henallux.koudou.dataAccess.repositories;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.henallux.koudou.App;
import com.henallux.koudou.models.ChangePasswordModel;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.dataAccess.network.AuthService;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.RegisterModel;
import com.henallux.koudou.models.ResponseModel;
import com.henallux.koudou.models.ResponseType;
import com.henallux.koudou.models.TokenModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class AuthRepository {
    private App context;
    private static AuthRepository instance;
    private  AuthService authService;

    private MutableLiveData<ErrorModel> error = new MutableLiveData<>();
    public LiveData<ErrorModel> getError() {
        return error;
    }

    private MutableLiveData<String> successAction = new MutableLiveData<>();
    public LiveData<String> getSuccessAction() {
        return successAction;
    }

    public static AuthRepository getInstance(App context){
        if(instance == null){
            instance = new AuthRepository(context);
        }
        return instance;
    }
    private AuthRepository(App context){
        this.context = context;
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
                    error.setValue(new ErrorModel("Authenticate", "Connexion échouée."));
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                error.setValue(new ErrorModel("Authenticate", "Connexion échouée."));
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
                    error.setValue(new ErrorModel("Register", "Inscription échouée."));
                }
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                error.setValue(new ErrorModel("Register", "Inscription échouée."));
            }
        });
    }

    public void  RefreshToken(RefreshTokenModel model){
        authService.RefreshToken(model).enqueue(new Callback<TokenModel>() {
            @Override
            public void onResponse(Call<TokenModel> call, Response<TokenModel> response) {
                TokenModel model = response.body();
                context.setToken(model);
            }

            @Override
            public void onFailure(Call<TokenModel> call, Throwable t) {
                error.setValue(new ErrorModel("RefreshToken", "Renouvellement de la connexion échouée."));
            }
        });
    }

    public void  ChangePassword(ChangePasswordModel model){
        authService.ChangePassword(model).enqueue(new Callback<Boolean>() {
            @Override
            public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                successAction.setValue("ChangePassword");
            }

            @Override
            public void onFailure(Call<Boolean> call, Throwable t) {
                error.setValue(new ErrorModel("ChangePassword", "La modification du mot de passe a échouée."));
            }
        });
    }
}
