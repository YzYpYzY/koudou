package com.henallux.koudou.dataAccess.network;

import com.google.gson.JsonElement;
import com.henallux.koudou.models.ChangePasswordModel;
import com.henallux.koudou.models.CredentialsModel;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;
import com.henallux.koudou.models.RefreshTokenModel;
import com.henallux.koudou.models.RegisterModel;
import com.henallux.koudou.models.TokenModel;
import com.henallux.koudou.models.enums.SortDirection;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface NewsService {
    @GET("api/1/News")
    Call<PagedResponseModel<NewsModel>> Get(@Query("startIndex") int startIndex, @Query("count") int count,  @Query("sort") String sort,  @Query("sortDirection") SortDirection sortDirection);
    @GET("api/1/News/{id}")
    Call<NewsModel> Get(@Path("id") int id);
    @DELETE("api/1/News/{id}")
    Call<Void> Delete(@Path("id") int id);
    @POST("api/1/News")
    Call<NewsModel> Create(@Body NewsModel model);
    @PUT("api/1/News/{id}")
    Call<NewsModel> Update(@Body NewsModel model, @Path("id") int id);
}
