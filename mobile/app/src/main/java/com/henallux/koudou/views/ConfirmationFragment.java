package com.henallux.koudou.views;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.henallux.koudou.R;
import com.henallux.koudou.views.tools.ConfirmActivity;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

import static android.content.Intent.getIntent;

public class ConfirmationFragment extends Fragment {
    private String confirmationMessage = null;
    private ConfirmActivity activity;
    @BindView(R.id.confirmation_message)
    public TextView confirmMessage;

    @OnClick(R.id.confirm_button_false)
    public void cancel() {
        activity.confirmationCancel();
    }
    @OnClick(R.id.confirm_button_true)
    public void confirm() {
        activity.confirmationValid();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activity = (ConfirmActivity)getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_confirmation, container, false);
        ButterKnife.bind(this, view);
        confirmMessage.setText(confirmationMessage);
        return view;
    }

    public void setConfirmationMessage(String confirmationMessage) {
        this.confirmationMessage = confirmationMessage;
    }
}