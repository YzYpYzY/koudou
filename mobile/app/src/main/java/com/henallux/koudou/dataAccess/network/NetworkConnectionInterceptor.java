package com.henallux.koudou.dataAccess.network;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public abstract class NetworkConnectionInterceptor implements Interceptor {

    public abstract boolean isInternetAvailable();

    public abstract void onInternetUnavailable();


    @Override
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        if (!isInternetAvailable()) {
            onInternetUnavailable();
            request = request.newBuilder().build();
            Response response = chain.proceed(request);
            return response;
        }
        return chain.proceed(request);
    }
}