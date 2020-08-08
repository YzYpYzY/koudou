package com.henallux.koudou.models;

import com.henallux.koudou.models.enums.SortDirection;

public class PageRequestOptions {
    private int startIndex;
    private int count;
    private String sort;
    private SortDirection sortDirection;

    public PageRequestOptions(int startIndex, int count, String sort, SortDirection sortDirection) {
        this.startIndex = startIndex;
        this.count = count;
        this.sort = sort;
        this.sortDirection = sortDirection;
    }

    public int getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(int startIndex) {
        this.startIndex = startIndex;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public SortDirection getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(SortDirection sortDirection) {
        this.sortDirection = sortDirection;
    }
}
