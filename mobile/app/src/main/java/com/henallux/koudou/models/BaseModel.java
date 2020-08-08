package com.henallux.koudou.models;

public class BaseModel {
    public BaseModel() {
    }
    public BaseModel(int id, int rowVersion) {
        id = id;
        rowVersion = rowVersion;
    }

    private int id;
    private int rowVersion;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        id = id;
    }

    public int getRowVersion() {
        return rowVersion;
    }

    public void setRowVersion(int rowVersion) {
        rowVersion = rowVersion;
    }
}
