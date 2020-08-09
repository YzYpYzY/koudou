package com.henallux.koudou.views.news;

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
import com.henallux.koudou.viewModels.NewsViewModel;
import com.henallux.koudou.views.tools.ValidateFragment;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class CreateNewsFragment extends Fragment implements Validator.ValidationListener, ValidateFragment {

    @BindView(R.id.news_title_text)
    @NotEmpty(messageResId = R.string.valid_title_required)
    public TextInputEditText title;

    @BindView(R.id.news_content_text)
    @NotEmpty(messageResId = R.string.valid_content_required)
    public TextInputEditText content;

    private Boolean isNew = true;
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
        viewModel.getSelectedNews().observe(getActivity(), newsModel -> {
            if(newsModel == null){
                viewModel.model = new NewsModel(null, null, null, null);
                isNew = true;
            } else {
                viewModel.model = newsModel;
                isNew = false;
            }
            title.setText(viewModel.model.getTitle());
            content.setText(viewModel.model.getContent());
        });
    }

    @Override
    public void onValidationSucceeded() {
        if(isNew){
            if(viewModel.model == null){
                viewModel.model = new NewsModel(null,null,null,null);
            }
            viewModel.model.setTitle(title.getText().toString());
            viewModel.model.setContent(content.getText().toString());
            viewModel.createNews();
        } else {
            viewModel.model.setTitle(title.getText().toString());
            viewModel.model.setContent(content.getText().toString());
            viewModel.updateNews();
        }
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

    public void validate() {
        validator.validate();
    }
}