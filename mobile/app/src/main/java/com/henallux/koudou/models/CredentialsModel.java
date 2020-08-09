package com.henallux.koudou.models;

public class CredentialsModel {

    private String pseudo;

    private String password;

    public CredentialsModel(String pseudo, String password) {
        setPseudo(pseudo);
        setPassword(password);
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
