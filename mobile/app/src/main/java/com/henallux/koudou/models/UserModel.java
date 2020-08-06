package com.henallux.koudou.models;

public class UserModel {
    private String pseudo;
    private String email;

    public UserModel(String pseudo, String email, TokenModel token) {
        this.pseudo = pseudo;
        this.email = email;
        this.token = token;
    }

    private TokenModel token;

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public TokenModel getToken() {
        return token;
    }

    public void setToken(TokenModel token) {
        this.token = token;
    }
}
