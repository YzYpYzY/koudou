package com.henallux.koudou.dataAccess.network;

public interface InternetConnectionListener {
    void onInternetUnavailable();

    void onCacheUnavailable();
}
