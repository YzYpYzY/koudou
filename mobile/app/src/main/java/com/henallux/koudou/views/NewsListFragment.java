package com.henallux.koudou.views;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PagedResponseModel;
import com.henallux.koudou.viewModels.LoginViewModel;
import com.henallux.koudou.viewModels.NewsViewModel;
import com.henallux.koudou.views.tools.EndlessRecyclerViewScrollListener;
import com.henallux.koudou.views.tools.OnItemSelectedListener;

import java.util.ArrayList;
import java.util.List;

public class NewsListFragment extends Fragment {

    private NewsViewModel viewModel;
    private NewsAdapter adapter;

    private EndlessRecyclerViewScrollListener scrollListener;

    public NewsListFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        super.onCreateView(inflater,container, savedInstanceState);
        this.adapter = new NewsAdapter();
        View view = inflater.inflate(R.layout.fragment_news_list, container, false);
        RecyclerView newsRecyclerView = view.findViewById(R.id.news_list);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this.getContext());
        newsRecyclerView.setLayoutManager(linearLayoutManager);
        newsRecyclerView.setAdapter(adapter);
        scrollListener = new EndlessRecyclerViewScrollListener(linearLayoutManager) {
            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view) {
                // Triggered only when new data needs to be appended to the list
                // Add whatever code is needed to append new items to the bottom of the list
                loadNextNews(page);
            }
        };
        // Adds the scroll listener to RecyclerView
        newsRecyclerView.addOnScrollListener(scrollListener);
        return view;
    }

    private void loadNextNews(int page) {
        viewModel.loadNextNews(page);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel =  new NewsViewModel((App) getActivity().getApplication());
        viewModel.getNews().observe(getViewLifecycleOwner(), new Observer<PagedResponseModel<NewsModel>>() {
            @Override
            public void onChanged(PagedResponseModel<NewsModel> news) {
                adapter.addNews(news.getValues());
            }
        });
        viewModel.loadNews();
    }

    private class NewsViewHolder extends RecyclerView.ViewHolder{

        public TextView title;
        public TextView content;
        public TextView creator;
        public TextView date;

        public NewsViewHolder(@NonNull View itemView, OnItemSelectedListener listener) {
            super(itemView);
            title = itemView.findViewById(R.id.news_title);
            content = itemView.findViewById(R.id.news_content);
            creator = itemView.findViewById(R.id.news_creator);
            date = itemView.findViewById(R.id.news_date);
        }
    }

    private class NewsAdapter extends RecyclerView.Adapter<NewsViewHolder> {
        private List<NewsModel> news = new ArrayList<NewsModel>();

        @NonNull
        @Override
        public NewsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            ConstraintLayout v = (ConstraintLayout) LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_list_news, parent, false);
            NewsViewHolder vh = new NewsViewHolder(v,
                    new OnItemSelectedListener() {
                        @Override
                        public void onItemSelected(int position) {
                            NewsModel touchedNews = news.get(position);
                        }
                    });
            return vh;
        }
        @Override
        public void onBindViewHolder(@NonNull NewsViewHolder holder, int position) {
            NewsModel n = news.get(position);
            holder.title.setText(n.getTitle());
            holder.content.setText(n.getContent());
            holder.creator.setText(n.getCreator());
            holder.date.setText(n.getDate());
        }

        @Override
        public int getItemCount() {
            return news == null ? 0 : news.size();
        }

        public void addNews(List<NewsModel> news) {
            this.news.addAll(news);
            notifyDataSetChanged();
        }
    }
}