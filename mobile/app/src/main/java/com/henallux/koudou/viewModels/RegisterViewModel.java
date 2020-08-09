package com.henallux.koudou.viewModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.RegisterModel;

public class RegisterViewModel extends ViewModel {
    public RegisterModel model;

    private AuthRepository authRepository;

    public RegisterViewModel(){
        App app = App.getInstance();
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
        authRepository.register(model);
    }
}