package com.henallux.koudou.views;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.TokenModel;
import com.henallux.koudou.viewModels.LoginViewModel;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class LoginActivity extends BaseActivity implements Validator.ValidationListener {

    @BindView(R.id.login_pseudo_text)
    @NotEmpty(message = "Le pseudo est obligatoire.")
    public TextInputEditText pseudo;

    @BindView(R.id.login_password_text)
    @NotEmpty(message = "Le mot de passe est obligatoire.")
    public TextInputEditText password;

    private Validator validator;
    private LoginViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        if(app.isLogged()){
            goToNews();
        }
        ButterKnife.bind(this);
        validator = new Validator(this);
        validator.setValidationListener(this);
        viewModel = ViewModelProviders.of(this).get(LoginViewModel.class);
        viewModel.getError().observe(this, new Observer<ErrorModel>() {
            @Override
            public void onChanged(ErrorModel errorModel) {
                showError(errorModel);
            }
        });
        viewModel.getSuccessAction().observe(this, new Observer<String>() {
            @Override
            public void onChanged(String successAction) {
                if(successAction == "Authenticate"){
                    goToNews();
                }
            }
        });
    }

    private void goToNews() {
        app.navigate(this, NewsActivity.class, null);
    }


    @OnClick(R.id.login_register_switch_btn)
    public void goToRegister() {
        app.navigate(this, RegisterActivity.class, null);
    }

    @OnClick(R.id.login_connect_btn)
    public void ConnectClick(){
        validator.validate();
    }

    private void Authenticate(){
        viewModel.model.setPassword(password.getText().toString());
        viewModel.model.setPseudo(pseudo.getText().toString());
        viewModel.Authenticate();
    }

    @Override
    public void onValidationSucceeded() {
        Authenticate();
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        for (ValidationError error : errors) {
            View view = error.getView();
            String message = error.getCollatedErrorMessage(this);

            // Display error messages ;)
            if (view instanceof EditText) {
                ((EditText) view).setError(message);
            } else {
                Toast.makeText(this, message, Toast.LENGTH_LONG).show();
            }
        }
    }
}