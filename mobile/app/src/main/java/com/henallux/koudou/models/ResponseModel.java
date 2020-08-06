package com.henallux.koudou.models;

public class ResponseModel<T> {
    public ResponseModel(ResponseType responseType, T value, String error) {
        this.responseType = responseType;
        this.error = error;
        this.value = value;
    }

    private ResponseType responseType;
    private String error;
    private T value;

    public ResponseType getResponseType() {
        return responseType;
    }

    public void setResponseType(ResponseType responseType) {
        this.responseType = responseType;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
