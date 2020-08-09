package com.henallux.koudou.views.auth;

import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import android.os.Bundle;

import com.henallux.koudou.R;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.viewModels.ProfilViewModel;
import com.henallux.koudou.views.BaseActivity;

public class ProfilActivity extends BaseActivity {

    private FragmentManager fragmentManager;
    private ProfilViewModel viewModel;

    @Override
    public void onBackPressed() {
        //super.onBackPressed(); DISABLE BACK PRESS
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profil);
        app.chechIsLogged();
        initTopBar();
        viewModel = ViewModelProviders.of(this).get(ProfilViewModel.class);
        viewModel.getError().observe(this, new Observer<ErrorModel>() {
            @Override
            public void onChanged(ErrorModel errorModel) {
                showError(errorModel);
            }
        });
        viewModel.getSuccessAction().observe(this, new Observer<String>() {
            @Override
            public void onChanged(String successAction) {
                switch (successAction){
                    case "ChangePassword":
                        showSuccessMessage(getString(R.string.success_password_modify));
                        goToProfil();
                }
            }
        });
        fragmentManager = getSupportFragmentManager();
        goToProfil();
    }

    public void goToChangePassword() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        ModifyPasswordFragment fragment = new ModifyPasswordFragment();
        fragmentTransaction.replace(R.id.fragment_profil_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }

    public void goToProfil() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        ProfilFragment fragment = new ProfilFragment();
        fragmentTransaction.replace(R.id.fragment_profil_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }
}