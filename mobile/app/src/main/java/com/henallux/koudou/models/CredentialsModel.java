package com.henallux.koudou.models;

public class CredentialsModel {

    private String Pseudo;

    private String Password;

    public CredentialsModel(String pseudo, String password) {
        setPseudo(pseudo);
        setPassword(password);
    }

    public String getPseudo() {
        return Pseudo;
    }

    public void setPseudo(String pseudo) {
        Pseudo = pseudo;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
