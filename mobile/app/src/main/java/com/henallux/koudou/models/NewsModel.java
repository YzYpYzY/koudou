package com.henallux.koudou.models;

public class NewsModel extends BaseModel {
    private String title;
    private String content;
    private String creator;
    private String date;

    public NewsModel(String title, String content, String creator, String date){
        super();
        this.title = title;
        this.content = content;
        this.creator = creator;
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
