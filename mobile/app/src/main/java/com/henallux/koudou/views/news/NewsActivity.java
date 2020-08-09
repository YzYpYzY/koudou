package com.henallux.koudou.views.news;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.ViewModelProviders;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.ContextThemeWrapper;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;


import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.tools.RessourceClaims;
import com.henallux.koudou.viewModels.NewsViewModel;
import com.henallux.koudou.views.BaseActivity;
import com.henallux.koudou.views.ConfirmationFragment;
import com.henallux.koudou.views.tools.ActionDescriptor;
import com.henallux.koudou.views.tools.ConfirmActivity;
import com.henallux.koudou.views.tools.ValidateFragment;

import java.util.HashMap;

public class NewsActivity extends BaseActivity implements ConfirmActivity {

    private FragmentManager fragmentManager;
    private LinearLayout bottomBar;
    private NewsViewModel viewModel;
    private String[] displayedActions;
    private HashMap<String, ActionDescriptor> actionDescriptors;
    private Fragment activeFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news);
        viewModel = ViewModelProviders.of(this).get(NewsViewModel.class);
        initTopBar();
        fragmentManager = getSupportFragmentManager();
        bottomBar = findViewById(R.id.bottomAppBar);
        viewModel.getSuccessAction().observe(this, action -> {
            switch(action){
                case "CreateNews":
                    goToList();
                    showSuccessMessage(getString(R.string.success_news_create));
                    break;
                case "UpdateNews":
                    goToList();
                    showSuccessMessage(getString(R.string.success_news_update));
                    break;
                case "DeleteNews":
                    goToList();
                    showSuccessMessage(getString(R.string.success_news_delete));
                    break;
            }
        });
        actionDescriptors = new HashMap<String, ActionDescriptor>(){{
            put("delete", new ActionDescriptor("delete", getString(R.string.action_delete), R.drawable.ic_baseline_delete_24, RessourceClaims.DeleteNews));
            put("create", new ActionDescriptor("create", getString(R.string.action_create), R.drawable.ic_baseline_add_24, RessourceClaims.CreateNews));
            put("update", new ActionDescriptor("update", getString(R.string.action_update), R.drawable.ic_baseline_edit_24, RessourceClaims.UpdateNews));
            put("details", new ActionDescriptor("details", getString(R.string.action_details), R.drawable.ic_baseline_chevron_right_24, RessourceClaims.ReadNews));
            put("cancel", new ActionDescriptor("cancel", getString(R.string.action_cancel), R.drawable.ic_baseline_cancel_24));
            put("save", new ActionDescriptor("save", getString(R.string.action_save), R.drawable.ic_baseline_save_24));
            put("back", new ActionDescriptor("back", getString(R.string.action_back), R.drawable.ic_baseline_chevron_right_24));
        }};
        goToList();
    }

    public void goToList() {
        displayedActions = new String[]{"create", "details"};
        manageActionBar();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        NewsListFragment fragment = new NewsListFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        activeFragment = fragment;
    }

    @Override
    public void confirmationCancel() {
        goToList();
    }

    @Override
    public void confirmationValid() {
        viewModel.deleteNews();
    }

    public void manageActionBar(){
        bottomBar.removeAllViews();
        for(String displayedAction : displayedActions){
            ActionDescriptor actionDescriptor = actionDescriptors.get(displayedAction);
            if(actionDescriptor != null && App.getInstance().hasAccess(actionDescriptor.getClaim())){
                Button newButton = new Button(new ContextThemeWrapper(this, R.style.KoudouButtonAction), null, 0);
                newButton.setText(actionDescriptor.getText());
                Drawable top = getResources().getDrawable(actionDescriptor.getIcon());
                newButton.setCompoundDrawablesWithIntrinsicBounds(null, top , null, null);
                newButton.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View view) {
                        handleActions(actionDescriptor.getName());
                    }
                });
                bottomBar.addView(newButton);
            }
        }
    }

    public void handleActions(String actionName){
        switch (actionName){
            case "delete":
                goToConfirmation();
                break;
            case "create":
                viewModel.selectNews(-1);
                goToCreate();
                break;
            case "details":
                goToDetails();
                break;
            case "update":
                goToUpdate();
                break;
            case "cancel":
                goToList();
                break;
            case "back":
                goToList();
                break;
            case "save":
                ((ValidateFragment) activeFragment).validate();
                break;
        }
    }

    private void goToCreate() {
        displayedActions = new String[]{"cancel", "save"};
        manageActionBar();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        CreateNewsFragment fragment = new CreateNewsFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        activeFragment = fragment;
    }

    private void goToDetails() {
        if(viewModel.getIsNewsSelected()){
            displayedActions = new String[]{"update", "delete","back"};
            manageActionBar();
            viewModel.loadDetails();
            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
            DetailsNewsFragment fragment = new DetailsNewsFragment();
            fragmentTransaction.replace(R.id.fragment_news_container, fragment);
            fragmentTransaction.addToBackStack(null);
            fragmentTransaction.commit();
            activeFragment = fragment;
        } else {
            showHint(getString(R.string.hint_news_select));
        }
    }

    private void goToConfirmation() {
        displayedActions = new String[]{};
        manageActionBar();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        ConfirmationFragment fragment = new ConfirmationFragment();
        fragment.setConfirmationMessage(getString(R.string.confirm_news_delete));
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        activeFragment = fragment;
    }

    private void goToUpdate(){
        displayedActions = new String[]{"cancel", "save"};
        manageActionBar();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        CreateNewsFragment fragment = new CreateNewsFragment();
        fragmentTransaction.replace(R.id.fragment_news_container, fragment);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
        activeFragment = fragment;
    }
}