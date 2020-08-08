package com.henallux.koudou.views;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.ViewModelProviders;

import android.os.Bundle;
import android.view.View;


import com.henallux.koudou.R;
import com.henallux.koudou.viewModels.NewsViewModel;
import com.henallux.koudou.views.tools.ConfirmActivity;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class NewsActivity extends BaseActivity implements ConfirmActivity {

    private FragmentManager fragmentManager;
    private View bottomBar;

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
    private NewsViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news);
        viewModel = ViewModelProviders.of(this).get(NewsViewModel.class);
        initTopBar();
        ButterKnife.bind(this);
        fragmentManager = getSupportFragmentManager();
        bottomBar = findViewById(R.id.bottomAppBar);
        viewModel.getSuccessAction().observe(this, action -> {
            switch(action){
                case "CreateNews":
                    goToDetails();
                    showSuccessMessage("News créée");
                    break;
                case "UpdateNews":
                    goToDetails();
                    showSuccessMessage("News mise à jour");
                    break;
                case "DeleteNews":
                    goToList();
                    showSuccessMessage("News supprimée");
                    break;
            }
        });
        goToList();
    }

    public void goToList() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        NewsListFragment fragment = new NewsListFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }

    private void goToCreate() {
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        CreateNewsFragment fragment = new CreateNewsFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }

    private void goToDetails() {
        if(viewModel.getIsNewsSelected()){
            viewModel.loadDetails();
            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
            DetailsNewsFragment fragment = new DetailsNewsFragment();
            fragmentTransaction.replace(R.id.fragment_news_container, fragment);
            fragmentTransaction.addToBackStack(null);
            fragmentTransaction.commit();
        } else {
            showHint("Sélectionner d'abord une news");
        }
    }

    private void goToConfirmation() {
        if(viewModel.getIsNewsSelected()){
            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
            ConfirmationFragment fragment = new ConfirmationFragment();
            fragment.setConfirmationMessage("Voulez-vous vraiment supprimer cette news ?");
            fragmentTransaction.replace(R.id.fragment_news_container, fragment);
            fragmentTransaction.addToBackStack(null);
            fragmentTransaction.commit();
        } else {
            showHint("Sélectionner d'abord une news");
        }
    }

    @Override
    public void confirmationCancel() {
        goToList();
    }

    @Override
    public void confirmationValid() {
        viewModel.deleteNews();
    }
}