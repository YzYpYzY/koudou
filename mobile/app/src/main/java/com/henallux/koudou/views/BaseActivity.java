package com.henallux.koudou.views;

import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.appbar.MaterialToolbar;
import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.views.auth.ProfilActivity;
import com.henallux.koudou.views.member.MemberActivity;
import com.henallux.koudou.views.news.NewsActivity;

public class BaseActivity extends AppCompatActivity {

    protected App app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (App) getApplication();
    }

    protected void initTopBar(){
        MaterialToolbar topAppBar = findViewById(R.id.topAppBar);
        topAppBar.setOnMenuItemClickListener(item -> {
            Class newActivity = null;
            switch (item.getItemId()){
                case R.id.profil_menu:
                    newActivity = ProfilActivity.class;
                    break;
                case R.id.news_menu:
                    newActivity = NewsActivity.class;
                    break;
                case R.id.member_menu:
                    newActivity = MemberActivity.class;
                    break;
            }
            if(newActivity != app.getCurrentActivity()){
                app.navigate(this, newActivity, null);
            }
            return true;
        });
    }

    protected void showError(ErrorModel errorModel) {
        Toast.makeText(this, errorModel.getMessage(), Toast.LENGTH_LONG).show();
    }

    protected void showHint(String hint) {
        Toast.makeText(this, hint, Toast.LENGTH_LONG).show();
    }

    protected void showSuccessMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }
}
