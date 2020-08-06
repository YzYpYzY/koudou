package com.henallux.koudou.models;

public class RefreshTokenModel {

    private String RefreshToken;

    public String getRefreshToken() {
        return RefreshToken;
    }

    public RefreshTokenModel(String refreshToken) {
        RefreshToken = refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        RefreshToken = refreshToken;
    }
}
