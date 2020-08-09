package com.henallux.koudou.views.tools;

import android.graphics.drawable.Drawable;

import com.henallux.koudou.tools.RessourceClaims;

public class ActionDescriptor {
    private String name;
    private String text;
    private int icon;
    private RessourceClaims claim;

    public ActionDescriptor(String name, String text, int icon) {
        this.name = name;
        this.text = text;
        this.icon = icon;
        this.claim = null;
    }
    public ActionDescriptor(String name, String text, int icon, RessourceClaims claim) {
        this.name = name;
        this.text = text;
        this.icon = icon;
        this.claim = claim;
    }



    public String getName() {
        return name;
    }

    public void setName(String id) {
        this.name = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getIcon() {
        return icon;
    }

    public void setIcon(int icon) {
        this.icon = icon;
    }

    public RessourceClaims getClaim() {
        return claim;
    }

    public void setClaim(RessourceClaims icon) {
        this.claim = claim;
    }
}
