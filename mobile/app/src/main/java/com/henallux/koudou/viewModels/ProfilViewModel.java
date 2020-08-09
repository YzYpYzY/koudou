package com.henallux.koudou.viewModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.models.ChangePasswordModel;
import com.henallux.koudou.models.ErrorModel;

public class ProfilViewModel extends ViewModel {
    public ChangePasswordModel model;

    private App app;
    private AuthRepository authRepository;
    private MutableLiveData<String> pseudo = new MutableLiveData<>(null);
    private MutableLiveData<String> email = new MutableLiveData<>(null);

    public ProfilViewModel(){
        app = App.getInstance();
        authRepository = AuthRepository.getInstance(app);
        model = new ChangePasswordModel(null, null, null);
        pseudo.setValue(app.getStringSetting("pseudo"));
        email.setValue(app.getStringSetting("email"));
    }

    public LiveData<String> getPseudo() {
        return pseudo;
    }

    public LiveData<String> getEmail() {
        return email;
    }

    public LiveData<String> getSuccessAction(){
        return authRepository.getSuccessAction();
    }

    public LiveData<ErrorModel> getError(){
        return authRepository.getError();
    }

    public void ChangePassword(){
        authRepository.changePassword(model);
    }

    public void logout() {
        app.logout();
    }
}