package com.henallux.koudou.dataAccess.repositories;

import android.content.Context;
import android.net.ConnectivityManager;
import android.os.AsyncTask;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.henallux.koudou.App;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.enums.ErrorType;

import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;

import retrofit2.Response;

import static androidx.core.content.ContextCompat.getSystemService;

public class BaseRepository {

    protected App context;

    protected MutableLiveData<ErrorModel> error = new MutableLiveData<>();
    public LiveData<ErrorModel> getError() {
        return error;
    }

    protected MutableLiveData<String> successAction = new MutableLiveData<>();
    public LiveData<String> getSuccessAction() {
        return successAction;
    }

    public BaseRepository(App context){
        this.context = context;
    }

    protected void treatError(Throwable exception, String from, String message){
        if(exception.getClass().equals(ConnectException.class)){
            new testNetwork().execute();
        }else{
            context.displayErrorPage(ErrorType.Unknown);
        }
    }
    protected void treatError(Response response, String from, String message){
        ErrorType type = ErrorType.Unknown;
        switch (response.code()){
            case 500:
                type = ErrorType.Server;
                context.displayErrorPage(type);
                return;
            case 400:
                type = ErrorType.BadRequest;
                break;
            case 412:
                type = ErrorType.Concurrency;
                break;
            case 401:
                type = ErrorType.UnAuthorize;
                break;
        }
        error.setValue(new ErrorModel(type, from, message));
    }

    private boolean isNetworkConnected() {
        try {
            URL url = new URL("https://www.google.com/");
            HttpURLConnection urlc = (HttpURLConnection)url.openConnection();
            urlc.setRequestProperty("User-Agent", "test");
            urlc.setRequestProperty("Connection", "close");
            urlc.setConnectTimeout(200); // mTimeout is in seconds
            urlc.connect();
            if (urlc.getResponseCode() == 200) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    private class testNetwork extends AsyncTask<Void,Void,Void> {

        private Boolean isConnected;
        @Override
        protected Void doInBackground(Void... params) {
            isConnected =  isNetworkConnected();
            return null;
        }

        @Override
        protected void onPostExecute(Void param) {
            if(isConnected){
                context.displayErrorPage(ErrorType.UnavailableApi);
            } else {
                context.displayErrorPage(ErrorType.Connection);
            }
        }
    }

}
