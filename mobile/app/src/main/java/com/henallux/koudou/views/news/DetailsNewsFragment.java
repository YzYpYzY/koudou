package com.henallux.koudou.views.news;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.henallux.koudou.R;
import com.henallux.koudou.viewModels.NewsViewModel;
import com.henallux.koudou.views.news.NewsActivity;

import butterknife.BindView;
import butterknife.ButterKnife;

public class DetailsNewsFragment extends Fragment {

    @BindView(R.id.news_title)
    public TextView title;
    @BindView(R.id.news_creator)
    public TextView creator;
    @BindView(R.id.news_date)
    public TextView date;
    @BindView(R.id.news_content)
    public TextView content;
    private NewsViewModel viewModel;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_details_news, container, false);
        ButterKnife.bind(this, view);
        viewModel = ViewModelProviders.of(this).get(NewsViewModel.class);
        viewModel.getSelectedNews().observe(getActivity(), newsModel -> {
            if(newsModel != null){
                title.setText(newsModel.getTitle());
                creator.setText(newsModel.getCreator());
                date.setText(newsModel.getDate());
                content.setText(newsModel.getContent());
            }
        });
        return view;
    }
}