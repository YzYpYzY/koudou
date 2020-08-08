package com.henallux.koudou.models;

import com.henallux.koudou.models.enums.ErrorType;

public class ErrorModel {
    private ErrorType type;
    private String from;
    private String message;

    public ErrorModel(ErrorType type, String from, String message) {
        this.setType(type);
        this.setFrom(from);
        this.setMessage(message);
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorType getType() {
        return type;
    }

    public void setType(ErrorType type) {
        this.type = type;
    }
}
