package com.henallux.koudou.models;

import java.util.ArrayList;
import java.util.List;

public class PagedResponseModel<T> {
    private PageRequestOptions options;
    private int totalCount;
    private List<T> values;

    public PagedResponseModel(PageRequestOptions options, int totalCount, ArrayList<T> values) {
        this.options = options;
        this.totalCount = totalCount;
        this.values = values;
    }

    public PageRequestOptions getOptions() {
        return options;
    }

    public void setOptions(PageRequestOptions options) {
        this.options = options;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public List<T> getValues() {
        return values;
    }

    public void setValues(ArrayList<T> values) {
        this.values = values;
    }
}
