package com.henallux.koudou.models;

public class RegisterModel {

    private String pseudo;
    private String email;
    private String password;
    private String confirmPassword;

    public RegisterModel(String pseudo, String email, String password, String confirmPassword) {
        setPseudo(pseudo);
        setEmail(email);
        setPassword(password);
        setConfirmPassword(confirmPassword);
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
