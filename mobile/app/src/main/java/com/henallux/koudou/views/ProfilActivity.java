package com.henallux.koudou.views;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import android.os.Bundle;
import android.widget.TextView;

import com.google.android.material.textfield.TextInputEditText;
import com.henallux.koudou.R;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.viewModels.LoginViewModel;
import com.henallux.koudou.viewModels.ProfilViewModel;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ProfilActivity extends BaseActivity {

    private FragmentManager fragmentManager;
    private ProfilViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profil);
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
                        showSuccessMessage("Mot de passe modifié.");
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