package com.henallux.koudou.viewModels;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.AuthRepository;
import com.henallux.koudou.dataAccess.repositories.NewsRepository;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;

import java.util.ArrayList;
import java.util.List;

public class NewsViewModel extends ViewModel {
    private NewsRepository newsRepository;
    public NewsModel model;
    public NewsViewModel(){
        App app = App.getInstance();
        newsRepository = NewsRepository.getInstance(app);
    }
    private int selectedNewsId = -1;
    public boolean getIsNewsSelected(){
        return selectedNewsId > 0;
    }
    public LiveData<PagedResponseModel<NewsModel>> getNews(){
        return newsRepository.getNews();
    }
    public LiveData<NewsModel> getSelectedNews(){
        return newsRepository.getSelectedNews();
    }
    public LiveData<String> getSuccessAction(){
        return newsRepository.getSuccessAction();
    }
    public LiveData<ErrorModel> getError(){
        return newsRepository.getError();
    }
    public void loadNews(){
        newsRepository.Get(new PageRequestOptions(0, 10, null, null));
    }

    public void loadNextNews(int page) {
        newsRepository.Get(new PageRequestOptions((page * 10) - 1, 10, null, null));
    }

    public void selectNews(int id){
        selectedNewsId = id;
    }

    public void loadDetails(){
        newsRepository.GetOne(selectedNewsId);
    }

    public void createNews(){
        newsRepository.Create(model);
    }
    public void deleteNews(){
        newsRepository.Delete(selectedNewsId);
        this.selectedNewsId = -1;
    }
}