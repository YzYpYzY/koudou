package com.henallux.koudou.models;

public class ChangePasswordModel {

    private String Password;
    private String NewPassword;
    private String ConfirmNewPassword;

    public ChangePasswordModel(String password, String newPassword, String confirmNewPassword) {
        Password = password;
        NewPassword = newPassword;
        ConfirmNewPassword = confirmNewPassword;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getNewPassword() {
        return NewPassword;
    }

    public void setNewPassword(String newPassword) {
        NewPassword = newPassword;
    }

    public String getConfirmNewPassword() {
        return ConfirmNewPassword;
    }

    public void setConfirmNewPassword(String confirmNewPassword) {
        ConfirmNewPassword = confirmNewPassword;
    }
}
