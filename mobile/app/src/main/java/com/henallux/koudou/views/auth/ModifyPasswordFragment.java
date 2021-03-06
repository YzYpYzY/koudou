package com.henallux.koudou.views.auth;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputEditText;
import com.henallux.koudou.R;
import com.henallux.koudou.viewModels.ProfilViewModel;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mobsandgeeks.saripaar.annotation.Password;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ModifyPasswordFragment extends Fragment implements Validator.ValidationListener{

    @BindView(R.id.modify_password_password_text)
    @NotEmpty(messageResId = R.string.valid_password_required)
    public TextInputEditText password;
    @BindView(R.id.modify_password_new_password_text)
    @NotEmpty(messageResId = R.string.valid_new_password_required)
    @Password(min = 8, scheme = Password.Scheme.ALPHA_MIXED_CASE, messageResId = R.string.valid_password_complexity)
    public TextInputEditText newPassword;
    @BindView(R.id.modify_password_confirm_password_text)
    @NotEmpty(messageResId = R.string.valid_password_confirm_required)
    public TextInputEditText confirmPassword;

    private Validator validator;
    private ProfilViewModel viewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_modify_password, container, false);
        ButterKnife.bind(this, view);
        validator = new Validator(this);
        validator.setValidationListener(this);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel = ViewModelProviders.of(this).get(ProfilViewModel.class);
    }

    @OnClick(R.id.modify_password_cancel)
    public void goToLogin() {
        ((ProfilActivity)getActivity()).goToProfil();
    }

    @OnClick(R.id.modify_password_confirm)
    public void validate() {
        validator.validate();
    }

    @Override
    public void onValidationSucceeded() {
        viewModel.model.setPassword(password.getText().toString());
        viewModel.model.setNewPassword(newPassword.getText().toString());
        viewModel.model.setConfirmNewPassword(confirmPassword.getText().toString());
        viewModel.ChangePassword();
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        for (ValidationError error : errors) {
            View view = error.getView();
            String message = error.getCollatedErrorMessage(getActivity());

            // Display error messages ;)
            if (view instanceof EditText) {
                ((EditText) view).setError(message);
            } else {
                Toast.makeText(getActivity(), message, Toast.LENGTH_LONG).show();
            }
        }
    }
}