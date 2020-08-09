package com.henallux.koudou.views.member;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.ViewModelProviders;

import com.henallux.koudou.R;
import com.henallux.koudou.models.MemberFullModel;
import com.henallux.koudou.viewModels.MemberViewModel;
import com.henallux.koudou.views.ConfirmationFragment;
import com.henallux.koudou.views.tools.ValidateFragment;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;

import java.util.List;

public class MemberFormFragment extends Fragment implements ValidateFragment {

    private Boolean isNew = true;
    private FragmentManager fragmentManager;
    private String activeFragmentName;
    private MemberFormInfosFragment infoFragment;
    private MemberViewModel viewModel;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_form_member, container, false);
        fragmentManager = getChildFragmentManager();
        goToInfos();
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel = ViewModelProviders.of(getActivity()).get(MemberViewModel.class);
        viewModel.getSelectedMember().observe(getActivity(), memberModel -> {
            if(memberModel == null){
                viewModel.model = new MemberFullModel(null, null, null, 'U', null);
                isNew = true;
            } else {
                viewModel.model = memberModel;
                isNew = false;
            }
        });
    }

    public void validate() {
        infoFragment.validate();
    }

    public void setInfosValidationResult(boolean res){
        if(res){
            if(isNew){
                viewModel.createMember();
            } else {
                viewModel.updateMember();
            }
        } else {
            if(activeFragmentName != "Infos"){
                goToInfos();
            }
        }
    }

    public void goToInfos(){
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        MemberFormInfosFragment fragment = new MemberFormInfosFragment();
        fragmentTransaction.replace(R.id.fragment_members_form_container_panel, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        infoFragment = fragment;
        activeFragmentName = "Infos";
    }
}