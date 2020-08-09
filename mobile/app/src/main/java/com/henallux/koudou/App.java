package com.henallux.koudou;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.henallux.koudou.dataAccess.network.TokenAuthenticator;
import com.henallux.koudou.models.TokenModel;
import com.henallux.koudou.models.enums.ErrorType;
import com.henallux.koudou.tools.JWTUtils;
import com.henallux.koudou.tools.RessourceClaims;
import com.henallux.koudou.views.ErrorActivity;
import com.henallux.koudou.views.auth.LoginActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.security.cert.CertificateException;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Protocol;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class App extends Application {
    private static final String BASE_URL = "https://koudou-api.yzypyzy.com/"; //"https://127.0.0.1:5001/"; //"https://koudou-api.yzypyzy.com/"; //

    static boolean ISDEBUG = false;
    private static App instance;

    private Map<String, Object> services;

    private SharedPreferences settings;
    private Class currentActivity = LoginActivity.class;
    private Bundle currentActivityBundle = null;
    private HashSet<RessourceClaims> userClaims = new HashSet<>();

    public App (){
        super();
        instance = this;
    }
    public static App getInstance() {
        return instance;
    }

    public boolean isLogged() {
        try {
            String access_token = getStringSetting("access_token");
            if (access_token != null) {
                if (userClaims.isEmpty()) {
                    setClaims(access_token);
                }
                return true;
            }
            return false;
        } catch (Exception e){
            this.cleanToken();
            return false;
        }
    }
    public void chechIsLogged(){
        if(!isLogged()){
            navigate(this, LoginActivity.class, null);
        }
    }

    private void setClaims(String access_token) throws Exception {
        JSONObject tokenDecoded = JWTUtils.decode(access_token);
        JSONArray claims = tokenDecoded.getJSONArray("RessourceAccess");
        for (int i = 0; i < claims.length(); i++) {
            String name = (String) claims.get(i);
            try {
                RessourceClaims claimType = RessourceClaims.valueOf(name);
                userClaims.add(claimType);
            } catch (Exception e) {
                Log.i("Security", "Claim " + name + "doesn't exist in the app.");
            }
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        int appFlags = getApplicationInfo().flags;
        ISDEBUG = (appFlags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        settings = this.getSharedPreferences(this.getResources()
                .getString(R.string.sharedPreferences_token), this.MODE_PRIVATE);
        this.services = new HashMap<String, Object>();
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
        SharedPreferences.Editor editor = settings.edit();
        editor.putString(name, value);
        editor.apply();
    }

    public void removeStringSetting(String name){
        SharedPreferences.Editor editor = settings.edit();
        editor.remove(name);
        editor.apply();
    }

    public void setToken(TokenModel token){
        try{
            JSONObject tokenDecoded = JWTUtils.decode(token.getAccess_token());
            setStringSetting("pseudo", tokenDecoded.getString("nameid"));
            setStringSetting("email", tokenDecoded.getString("email"));
            setStringSetting("access_token", token.getAccess_token());
            setStringSetting("refresh_token", token.getRefresh_token());
            setClaims(token.getAccess_token());
        } catch (Exception e){
            Toast.makeText(this, R.string.error_connection_fail, Toast.LENGTH_SHORT);
        }
    }

    public void cleanToken(){
        removeStringSetting("pseudo");
        removeStringSetting("email");
        removeStringSetting("access_token");
        removeStringSetting("refresh_token");
        userClaims.clear();
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
        if(ISDEBUG) {
            try {
                final TrustManager[] trustAllCerts = new TrustManager[]{
                        new X509TrustManager() {
                            @Override
                            public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                            }

                            @Override
                            public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                            }

                            @Override
                            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                                return new java.security.cert.X509Certificate[]{};
                            }
                        }
                };

                // Install the all-trusting trust manager
                final SSLContext sslContext = SSLContext.getInstance("SSL");
                sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

                // Create an ssl socket factory with our all-trusting manager
                final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
                okHttpClientBuilder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);
                okHttpClientBuilder.hostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        return true;
                    }
                });
            } catch (Exception e) {
            }
        }

        okHttpClientBuilder.protocols(Collections.singletonList(Protocol.HTTP_1_1));
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

        return okHttpClientBuilder.build();
    }

    public void displayErrorPage(ErrorType type) {
        Intent intent = new Intent(this, ErrorActivity.class);
        String message = null;
        Boolean backAvailable = false;
        switch (type){
            case Connection:
                message = getString(R.string.error_app_unavailable_internet);
                break;
            case UnavailableApi:
                message = getString(R.string.error_app_unavailable_api);
                break;
            case Server:
                message = getString(R.string.error_app_api);
                backAvailable = true;
                break;
            case Unknown:
                message = getString(R.string.error_app_unknown);
                backAvailable = true;
                break;
        }
        intent.putExtra("error_message", message);
        intent.putExtra("back_available", backAvailable);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    public void navigate (Context context, Class activity, Bundle options){
        currentActivity = activity;
        currentActivityBundle = options;
        Intent intent = new Intent(this, activity);

        if(options != null){
            context.startActivity(intent, options);
        } else {
            context.startActivity(intent);
        }
    }
    public void backToActivity(){
        Intent intent = new Intent(this, currentActivity);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if(currentActivityBundle != null){
            startActivity(intent, currentActivityBundle);
        } else {
            startActivity(intent);
        }
    }

    public Class getCurrentActivity() {
        return currentActivity;
    }

    public void logout() {
        cleanToken();
        Intent intent = new Intent(this, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent, null);
    }

    public boolean hasAccess(RessourceClaims claim) {
        if(claim == null){
            return true;
        }
        return userClaims.contains(claim);
    }
}