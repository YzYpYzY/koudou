package com.henallux.koudou.dataAccess.network;

import androidx.lifecycle.MutableLiveData;

import com.henallux.koudou.models.ErrorModel;

import okhttp3.Response;

public class ErrorManager {
    private static ErrorManager instance;

    private MutableLiveData<ErrorModel> mainError;

    public static ErrorManager getInstance() {
        if(instance == null){
            instance = new ErrorManager();
        }
        return instance;
    }

    public ErrorModel treatError(Exception e){
        return null;
    }

    public ErrorModel treatError(Response response){

        return null;
    }
}
