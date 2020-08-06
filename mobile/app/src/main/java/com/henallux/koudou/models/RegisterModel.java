package com.henallux.koudou.models;

public class RegisterModel {

    private String Pseudo;
    private String Email;
    private String Password;
    private String ConfirmPassword;

    public RegisterModel(String pseudo, String email, String password, String confirmPassword) {
        setPseudo(pseudo);
        setEmail(email);
        setPassword(password);
        setConfirmPassword(confirmPassword);
    }

    public String getPseudo() {
        return Pseudo;
    }

    public void setPseudo(String pseudo) {
        Pseudo = pseudo;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getConfirmPassword() {
        return ConfirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        ConfirmPassword = confirmPassword;
    }
}
