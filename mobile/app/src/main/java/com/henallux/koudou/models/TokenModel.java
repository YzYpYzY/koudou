package com.henallux.koudou.models;

public class TokenModel {
    private String access_token;
    private String refresh_token;
    private String scope;
    private String token_type;
    private int expires_in;
    private String expiration;

    public TokenModel(String access_token, String refresh_token, String scope, String token_type, int expires_in, String expiration) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.scope = scope;
        this.token_type = token_type;
        this.expires_in = expires_in;
        this.expiration = expiration;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public int getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(int expires_in) {
        this.expires_in = expires_in;
    }

    public String getExpiration() {
        return expiration;
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }
}
