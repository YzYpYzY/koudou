package com.henallux.koudou.viewModels;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.RegisterModel;

public class RegisterViewModel extends AndroidViewModel {
    private AuthRepository authRepository;

    public RegisterModel model;

    public RegisterViewModel(App app){
        super(app);
        authRepository = AuthRepository.getInstance(app);
        model = new RegisterModel(null, null, null, null);
    }

    public LiveData<String> getSuccessAction(){
        return authRepository.getSuccessAction();
    }

    public LiveData<ErrorModel> getError(){
        return authRepository.getError();
    }

    public void Register(){
        authRepository.Register(model);
    }
}