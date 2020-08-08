package com.henallux.koudou.dataAccess.repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.google.gson.JsonElement;
import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.network.AuthService;
import com.henallux.koudou.dataAccess.network.NewsService;
import com.henallux.koudou.models.ChangePasswordModel;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.RegisterModel;
import com.henallux.koudou.models.TokenModel;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class NewsRepository extends BaseRepository{
    private static NewsRepository instance;
    private NewsService newsService;

    private MutableLiveData<PagedResponseModel<NewsModel>> news = new MutableLiveData<>();
    public LiveData<PagedResponseModel<NewsModel>> getNews() {
        return news;
    }

    private MutableLiveData<NewsModel> selectedNews = new MutableLiveData<>();
    public LiveData<NewsModel> getSelectedNews() {
        return selectedNews;
    }

    public static NewsRepository getInstance(App context){
        if(instance == null){
            instance = new NewsRepository(context);
        }
        return instance;
    }
    private NewsRepository(App context){
        super(context);
        newsService = (NewsService) context.getService(NewsService.class);
    }

    public void Get(PageRequestOptions option){
        newsService.Get(option.getStartIndex(), option.getCount(), option.getSort(), option.getSortDirection()).enqueue(new Callback<PagedResponseModel<NewsModel>>() {
            @Override
            public void onResponse(Call<PagedResponseModel<NewsModel>> call, Response<PagedResponseModel<NewsModel>> response) {
                if(response.isSuccessful()){
                    PagedResponseModel<NewsModel> model = response.body();
                    successAction.setValue("GetNews");
                    news.setValue(model);
                } else {
                    treatError(response,"GetNews", "La récupération des news a échouée.");
                }
            }

            @Override
            public void onFailure(Call<PagedResponseModel<NewsModel>> call, Throwable t) {
                treatError(t,"GetNews", "La récupération des news a échouée.");
            }
        });
    }

    public void GetOne(int id){
        newsService.Get(id).enqueue(new Callback<NewsModel>() {
            @Override
            public void onResponse(Call<NewsModel> call, Response<NewsModel> response) {
                if(response.isSuccessful()){
                    NewsModel model = response.body();
                    successAction.setValue("GetOneNews");
                    selectedNews.setValue(model);
                } else {
                    treatError(response,"GetOneNews", "La récupération de cette news a échouée.");
                }
            }

            @Override
            public void onFailure(Call<NewsModel> call, Throwable t) {
                treatError(t,"GetOneNews", "La récupération de cette news a échouée.");
            }
        });
    }
}
