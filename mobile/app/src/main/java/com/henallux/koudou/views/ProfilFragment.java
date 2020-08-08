package com.henallux.koudou.views;

import androidx.lifecycle.ViewModelProviders;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.viewModels.LoginViewModel;
import com.henallux.koudou.viewModels.ProfilViewModel;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ProfilFragment extends Fragment {

    @BindView(R.id.profil_pseudo)
    public TextView pseudo;
    @BindView(R.id.profil_email)
    public TextView email;
    @OnClick(R.id.profil_change_password_btn)
    public void goToChangePassword() {
        ((ProfilActivity)getActivity()).goToChangePassword();
    }
    @OnClick(R.id.profil_logout_btn)
    public void logout() {
        viewModel.logout();
    }

    private ProfilViewModel viewModel;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profil, container, false);
        ButterKnife.bind(this, view);
        viewModel = ViewModelProviders.of(this).get(ProfilViewModel.class);
        viewModel.getPseudo().observe(getActivity(), pseudoValue -> {
            pseudo.setText(pseudoValue);
        });
        viewModel.getEmail().observe(getActivity(), emailValue -> {
            email.setText(emailValue);
        });
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel = ViewModelProviders.of(this).get(ProfilViewModel.class);
    }

}