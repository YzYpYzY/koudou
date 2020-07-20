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

import com.henallux.koudou.R;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.viewModels.NewsViewModel;

import java.util.List;

public class NewsListFragment extends Fragment {

    private NewsViewModel viewModel;
    private NewsAdapter adapter;

    public NewsListFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        super.onCreateView(inflater,container, savedInstanceState);
        this.adapter = new NewsAdapter();
        View view = inflater.inflate(R.layout.fragment_news_list, container, false);
        RecyclerView newsRecyclerView = view.findViewById(R.id.news_list);
        newsRecyclerView.setLayoutManager(new LinearLayoutManager(this.getContext()));
        newsRecyclerView.setAdapter(adapter);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel =  ViewModelProviders.of(getActivity())
                .get(NewsViewModel.class);
        viewModel.getNews().observe(getViewLifecycleOwner(), new Observer<List<NewsModel>>() {
            @Override
            public void onChanged(List<NewsModel> news) {
                adapter.setNews(news);
            }
        });
    }

    private class NewsViewHolder extends RecyclerView.ViewHolder{

        public TextView title;
        public TextView content;
        public TextView author;
        public TextView date;

        public NewsViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.news_title);
            content = itemView.findViewById(R.id.news_content);
            author = itemView.findViewById(R.id.news_author);
            date = itemView.findViewById(R.id.news_date);
        }
    }

    private class NewsAdapter extends RecyclerView.Adapter<NewsViewHolder> {
        private List<NewsModel> news;
        @NonNull
        @Override
        public NewsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            ConstraintLayout v = (ConstraintLayout) LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_list_news, parent, false);
            NewsViewHolder vh = new NewsViewHolder(v);
            return vh;
        }
        @Override
        public void onBindViewHolder(@NonNull NewsViewHolder holder, int position) {
            NewsModel n = news.get(position);
            holder.title.setText(n.getTitle());
            holder.content.setText(n.getContent());
            holder.author.setText(n.getAuthor());
            holder.date.setText(n.getDate());
        }

        @Override
        public int getItemCount() {
            return news == null ? 0 : news.size();
        }

        public void setNews(List<NewsModel> news) {
            this.news = news;
            notifyDataSetChanged();
        }
    }
}