package com.henallux.koudou.views.auth;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.google.android.material.textfield.TextInputEditText;
import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.viewModels.RegisterViewModel;
import com.henallux.koudou.views.news.NewsActivity;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.ConfirmPassword;
import com.mobsandgeeks.saripaar.annotation.Email;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mobsandgeeks.saripaar.annotation.Password;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class RegisterActivity extends AppCompatActivity implements Validator.ValidationListener {

    @BindView(R.id.login_pseudo_text)
    @NotEmpty(messageResId = R.string.valid_pseudo_required)
    public TextInputEditText pseudo;
    @BindView(R.id.login_email_text)
    @NotEmpty(messageResId = R.string.valid_email_required)
    @Email(messageResId = R.string.valid_email_format)
    public TextInputEditText email;
    @BindView(R.id.login_password_text)
    @NotEmpty(messageResId = R.string.valid_password_required)
    @Password(min = 8, scheme = Password.Scheme.ALPHA_MIXED_CASE, messageResId = R.string.valid_password_complexity)
    public TextInputEditText password;
    @BindView(R.id.login_confirm_password_text)
    @NotEmpty(messageResId = R.string.valid_new_password_required)
    @ConfirmPassword(messageResId = R.string.valid_password_same_new_password)
    public TextInputEditText confirmPassword;

    private Validator validator;
    private RegisterViewModel viewModel;
    private App app;

    @Override
    public void onBackPressed() {
        //super.onBackPressed(); DISABLE BACK PRESS
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (App) getApplication();
        setContentView(R.layout.activity_register);
        ButterKnife.bind(this);
        validator = new Validator(this);
        validator.setValidationListener(this);

        viewModel = ViewModelProviders.of(this).get(RegisterViewModel.class);
        viewModel.getError().observe(this, new Observer<ErrorModel>() {
            @Override
            public void onChanged(ErrorModel errorModel) {
                showError(errorModel);
            }
        });
        viewModel.getSuccessAction().observe(this, new Observer<String>() {
            @Override
            public void onChanged(String successAction) {
                if(successAction == "Register"){
                    goToNews();
                }
            }
        });
    }

    @OnClick(R.id.login_connect_switch_btn)
    public void goToLogin() {
        app.navigate(this, LoginActivity.class,null);
    }

    @OnClick(R.id.login_register_btn)
    public void RegisterClick(){
        validator.validate();
    }

    @Override
    public void onValidationSucceeded() {
        Register();
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

    private void Register(){
        viewModel.model.setPseudo(pseudo.getText().toString());
        viewModel.model.setEmail(email.getText().toString());
        viewModel.model.setPassword(password.getText().toString());
        viewModel.model.setConfirmPassword(confirmPassword.getText().toString());
        viewModel.Register();
    }

    private void showError(ErrorModel errorModel) {
        Toast.makeText(this, errorModel.getMessage(), Toast.LENGTH_LONG).show();
    }
    private void goToNews() {
        app.navigate(this, NewsActivity.class,null);
    }
}