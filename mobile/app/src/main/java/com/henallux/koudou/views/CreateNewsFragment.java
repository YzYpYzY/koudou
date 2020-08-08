package com.henallux.koudou.views;

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
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.viewModels.LoginViewModel;
import com.henallux.koudou.viewModels.NewsViewModel;
import com.henallux.koudou.viewModels.ProfilViewModel;
import com.henallux.koudou.views.tools.ConfirmActivity;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class CreateNewsFragment extends Fragment implements Validator.ValidationListener{

    @BindView(R.id.news_title_text)
    @NotEmpty(message = "Le titre est obligatoire.")
    public TextInputEditText title;

    @BindView(R.id.news_content_text)
    @NotEmpty(message = "Le contenu est obligatoire.")
    public TextInputEditText content;

    @OnClick(R.id.news_cancel)
    public void cancel() {
        activity.goToList();
    }

    @OnClick(R.id.news_confirm)
    public void validate() {
        validator.validate();
    }

    private Validator validator;
    private NewsViewModel viewModel;
    private NewsActivity activity;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activity = (NewsActivity)getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_create_news, container, false);
        ButterKnife.bind(this, view);
        validator = new Validator(this);
        validator.setValidationListener(this);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel = ViewModelProviders.of(getActivity()).get(NewsViewModel.class);
    }

    @Override
    public void onValidationSucceeded() {
        viewModel.model = new NewsModel(null, null, null, null);
        viewModel.model.setTitle(title.getText().toString());
        viewModel.model.setContent(content.getText().toString());
        viewModel.createNews();
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