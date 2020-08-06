package com.henallux.koudou;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import androidx.lifecycle.ViewModel;

import com.google.gson.Gson;
import com.henallux.koudou.dataAccess.network.InternetConnectionListener;
import com.henallux.koudou.dataAccess.network.NetworkConnectionInterceptor;
import com.henallux.koudou.dataAccess.network.TokenAuthenticator;
import com.henallux.koudou.models.TokenModel;
import com.henallux.koudou.viewModels.LoginViewModel;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class App extends Application {
    private Map<String, Object> services;

    private InternetConnectionListener mInternetConnectionListener;
    private SharedPreferences settings;
    private static final String BASE_URL = "https://koudou.api.yzypyzy.com/";

    @Override
    public void onCreate() {
        super.onCreate();
        settings = this.getSharedPreferences(this.getResources()
                .getString(R.string.sharedPreferences_token), this.MODE_PRIVATE);
        this.services = new HashMap<String, Object>();
    }

    public void setInternetConnectionListener(InternetConnectionListener listener) {
        mInternetConnectionListener = listener;
    }

    public void removeInternetConnectionListener() {
        mInternetConnectionListener = null;
    }

    public Object getService(Class serviceClass) {
        if (services.get(serviceClass.getName()) == null) {
            Object newService = provideRetrofit().create(serviceClass);
            services.put(serviceClass.getName(),newService);
        }
        return services.get(serviceClass.getName());
    }

    public String getStringSetting(String name){
        return settings.getString(name, null);
    }

    public void setStringSetting(String name, String value){
        settings.edit().putString(name, null);
    }

    public void setToken(TokenModel token){
        setStringSetting("access_token", token.getAccess_token());
        setStringSetting("refresh_token", token.getRefresh_token());
    }

    private boolean isInternetAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    private Retrofit provideRetrofit() {
        return new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(provideOkHttpClient())
                .addConverterFactory(GsonConverterFactory.create(new Gson()))
                .build();
    }

    private OkHttpClient provideOkHttpClient() {
        OkHttpClient.Builder okHttpClientBuilder = new OkHttpClient.Builder();
        okHttpClientBuilder.connectTimeout(30, TimeUnit.SECONDS);
        okHttpClientBuilder.readTimeout(30, TimeUnit.SECONDS);
        okHttpClientBuilder.writeTimeout(30, TimeUnit.SECONDS);
        okHttpClientBuilder.authenticator(new TokenAuthenticator(this));
        okHttpClientBuilder.addInterceptor(
                new Interceptor() {
                    @Override
                    public Response intercept(Interceptor.Chain chain) throws IOException {
                        // Add default headers
                        Request.Builder requestBuilder = chain.request().newBuilder()
                                .addHeader("accept", "*/*")
                                .addHeader("accept-encoding:gzip", "gzip, deflate")
                                .addHeader("accept-language", "en-US,en;q=0.9");

                        String token = getStringSetting("access_token");
                        if (token != null) {
                            requestBuilder.addHeader("Authorization", "Bearer "+ token);
                        }
                        return chain.proceed(requestBuilder.build());
                    }
                }
        );
        okHttpClientBuilder.addInterceptor(new NetworkConnectionInterceptor() {
            @Override
            public boolean isInternetAvailable() {
                return App.this.isInternetAvailable();
            }

            @Override
            public void onInternetUnavailable() {
                if (mInternetConnectionListener != null) {
                    mInternetConnectionListener.onInternetUnavailable();
                }
            }
        });

        return okHttpClientBuilder.build();
    }
}