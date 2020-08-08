package com.henallux.koudou.views;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import android.os.Bundle;
import android.view.View;


import com.henallux.koudou.R;
import com.henallux.koudou.views.tools.ConfirmActivity;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class NewsActivity extends BaseActivity implements ConfirmActivity {

    private FragmentManager fragmentManager;
    private View bottomBar;
    public String confirmMessage = "Voulez-vous vraiment supprimer cette news ?";

    @OnClick(R.id.news_add_menu)
    public void add() {
        goToCreate();
    }
    @OnClick(R.id.news_delete_menu)
    public void delete() {
        goToConfirmation();
    }
    @OnClick(R.id.news_details_menu)
    public void details() {
        goToDetails();
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news);
        initTopBar();
        ButterKnife.bind(this);
        fragmentManager = getSupportFragmentManager();
        bottomBar = findViewById(R.id.bottomAppBar);
        goToList();
    }

    private void goToList() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        NewsListFragment fragment = new NewsListFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        bottomBar.setVisibility(View.VISIBLE);
    }

    private void goToCreate() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        CreateNewsFragment fragment = new CreateNewsFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        bottomBar.setVisibility(View.INVISIBLE);
    }

    private void goToDetails() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        DetailsNewsFragment fragment = new DetailsNewsFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        bottomBar.setVisibility(View.INVISIBLE);
    }

    private void goToConfirmation() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        ConfirmationFragment fragment = new ConfirmationFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        bottomBar.setVisibility(View.INVISIBLE);
    }

    @Override
    public void confirmationCancel() {
        goToList();
    }

    @Override
    public void confirmationValid() {

    }
}