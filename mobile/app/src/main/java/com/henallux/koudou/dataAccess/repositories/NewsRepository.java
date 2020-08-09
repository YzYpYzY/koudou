package com.henallux.koudou.dataAccess.repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.dataAccess.network.NewsService;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;

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

    public void get(PageRequestOptions option){
        newsService.get(option.getStartIndex(), option.getCount(), option.getSort(), option.getSortDirection()).enqueue(new Callback<PagedResponseModel<NewsModel>>() {
            @Override
            public void onResponse(Call<PagedResponseModel<NewsModel>> call, Response<PagedResponseModel<NewsModel>> response) {
                if(response.isSuccessful()){
                    PagedResponseModel<NewsModel> model = response.body();
                    successAction.setValue("GetNews");
                    news.setValue(model);
                } else {
                    treatError(response,"GetNews", app.getString(R.string.error_news_get_fail));
                }
            }

            @Override
            public void onFailure(Call<PagedResponseModel<NewsModel>> call, Throwable t) {
                treatError(t,"GetNews", app.getString(R.string.error_news_get_fail));
            }
        });
    }

    public void getOne(int id){
        newsService.get(id).enqueue(new Callback<NewsModel>() {
            @Override
            public void onResponse(Call<NewsModel> call, Response<NewsModel> response) {
                if(response.isSuccessful()){
                    NewsModel model = response.body();
                    successAction.setValue("GetOneNews");
                    selectedNews.setValue(model);
                } else {
                    treatError(response,"GetOneNews", app.getString(R.string.error_news_getone_fail));
                }
            }

            @Override
            public void onFailure(Call<NewsModel> call, Throwable t) {
                treatError(t,"GetOneNews", app.getString(R.string.error_news_getone_fail));
            }
        });
    }

    public void create(NewsModel model){
        newsService.create(model).enqueue(new Callback<NewsModel>() {
            @Override
            public void onResponse(Call<NewsModel> call, Response<NewsModel> response) {
                if(response.isSuccessful()){
                    NewsModel model = response.body();
                    successAction.setValue("CreateNews");
                    selectedNews.setValue(model);
                } else {
                    treatError(response,"CreateNews", app.getString(R.string.error_news_create_fail));
                }
            }

            @Override
            public void onFailure(Call<NewsModel> call, Throwable t) {
                treatError(t,"CreateNews", app.getString(R.string.error_news_create_fail));
            }
        });
    }

    public void update(NewsModel model){
        newsService.update(model, model.getId()).enqueue(new Callback<NewsModel>() {
            @Override
            public void onResponse(Call<NewsModel> call, Response<NewsModel> response) {
                if(response.isSuccessful()){
                    NewsModel model = response.body();
                    successAction.setValue("UpdateNews");
                    selectedNews.setValue(model);
                } else {
                    treatError(response,"UpdateNews", app.getString(R.string.error_news_update_fail));
                }
            }

            @Override
            public void onFailure(Call<NewsModel> call, Throwable t) {
                treatError(t,"UpdateNews", app.getString(R.string.error_news_update_fail));
            }
        });
    }

    public void delete(int id){
        newsService.delete(id).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                if(response.isSuccessful()){
                    successAction.setValue("DeleteNews");
                    selectedNews.setValue(null);
                    get(new PageRequestOptions(0, 20, null, null));
                } else {
                    treatError(response,"DeleteNews", app.getString(R.string.error_news_delete_fail));
                }
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                treatError(t,"DeleteNews", app.getString(R.string.error_news_delete_fail));
            }
        });
    }

    public void clearSelectedNews() {
        selectedNews.setValue(null);
    }
}
