package com.henallux.koudou.views;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.material.textfield.TextInputEditText;
import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ErrorActivity extends AppCompatActivity {

    @BindView(R.id.error_message)
    public TextView errorMessage;
    @BindView(R.id.error_back_btn)
    public Button errorBackBtn;

    @OnClick(R.id.error_back_btn)
    public void back() {
        ((App) getApplication()).backToActivity();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_error);
        ButterKnife.bind(this);
        Intent intent = getIntent();
        errorMessage.setText(intent.getStringExtra("error_message"));
        Boolean backAvailable = intent.getBooleanExtra("back_available", false);
        if(!backAvailable){
            errorBackBtn.setVisibility(View.INVISIBLE);
        }
    }
}