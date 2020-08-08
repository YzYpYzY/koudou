package com.henallux.koudou.viewModels;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.dataAccess.repositories.NewsRepository;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;

import java.util.ArrayList;
import java.util.List;

public class NewsViewModel extends AndroidViewModel {
    private NewsRepository newsRepository;

    public NewsViewModel(App app){
        super(app);
        newsRepository = NewsRepository.getInstance(app);
    }

    public LiveData<PagedResponseModel<NewsModel>> getNews(){
        return newsRepository.getNews();
    }
    public LiveData<NewsModel> getSelectedNews(){
        return newsRepository.getSelectedNews();
    }

    public void loadNews(){
        newsRepository.Get(new PageRequestOptions(0, 10, null, null));
    }

    public void loadNextNews(int page) {
        newsRepository.Get(new PageRequestOptions((page * 10) - 1, 10, null, null));
    }

    public void selectNews(int id){
        newsRepository.GetOne(id);
    }
}