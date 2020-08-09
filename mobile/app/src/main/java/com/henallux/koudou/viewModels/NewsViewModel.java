package com.henallux.koudou.viewModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.NewsRepository;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;

public class NewsViewModel extends ViewModel {
    public NewsModel model;

    private NewsRepository newsRepository;
    private int selectedNewsId = -1;

    public NewsViewModel(){
        App app = App.getInstance();
        newsRepository = NewsRepository.getInstance(app);
    }

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
        newsRepository.get(new PageRequestOptions(0, 10, null, null));
    }

    public void loadNextNews(int page) {
        newsRepository.get(new PageRequestOptions((page * 10) - 1, 10, null, null));
    }

    public void selectNews(int id){
        selectedNewsId = id;
        if(selectedNewsId == -1){
            newsRepository.clearSelectedNews();
        }
    }

    public void loadDetails(){
        newsRepository.getOne(selectedNewsId);
    }

    public void createNews(){
        newsRepository.create(model);
    }

    public void deleteNews(){
        newsRepository.delete(selectedNewsId);
        this.selectedNewsId = -1;
    }

    public void updateNews() {
        newsRepository.update(model);
    }
}