package com.henallux.koudou.viewModels;

import android.app.Application;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.models.ErrorModel;

public class LoginViewModel extends ViewModel {
    private AuthRepository authRepository;

    public CredentialsModel model;

    public LoginViewModel(){
        App app = App.getInstance();
        authRepository = AuthRepository.getInstance(app);
        model = new CredentialsModel(null, null);
    }

    public LiveData<String> getSuccessAction(){
        return authRepository.getSuccessAction();
    }

    public LiveData<ErrorModel> getError(){
        return authRepository.getError();
    }

    public void Authenticate(){
        authRepository.Authenticate(model);
    }
}