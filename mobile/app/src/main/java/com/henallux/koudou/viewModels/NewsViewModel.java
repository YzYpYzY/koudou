package com.henallux.koudou.viewModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.models.NewsModel;

import java.util.ArrayList;
import java.util.List;

public class NewsViewModel extends ViewModel {
    private MutableLiveData<List<NewsModel>> news;

    public LiveData<List<NewsModel>> getNews(){
        if(news == null){
            news = new MutableLiveData<List<NewsModel>>();
            loadNews();
        }
        return news;
    }

    private void loadNews(){
        ArrayList<NewsModel> list = new ArrayList<NewsModel>();
        list.add(new NewsModel(
                "Première news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "18/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        list.add(new NewsModel(
                "Deuxième news",
                "Ceci est une news pour tester. Il n'y a rien d'intérressant ici",
                "Jérôme Culot",
                "19/06/2020"
        ));
        this.news.postValue(list);
    }
}