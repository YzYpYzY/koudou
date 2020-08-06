package com.henallux.koudou.viewModels;

import android.app.Application;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.models.ErrorModel;

public class LoginViewModel extends AndroidViewModel {
    private AuthRepository authRepository;
    private MediatorLiveData<String> successAction;
    private MediatorLiveData<ErrorModel> error;

    public CredentialsModel model;

    public LoginViewModel(App app){
        super(app);
        authRepository = AuthRepository.getInstance(app);
        successAction.addSource(authRepository.getSuccessAction(),null);
        error.addSource(authRepository.getError(),null);
    }

    public LiveData<String> getSuccessAction(){
        return successAction;
    }

    public LiveData<ErrorModel> getError(){
        return error;
    }

    public void Authenticate(){
        authRepository.Authenticate(model);
    }
}