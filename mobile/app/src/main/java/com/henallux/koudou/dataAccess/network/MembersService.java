package com.henallux.koudou.dataAccess.network;

import com.henallux.koudou.models.MemberFullModel;
import com.henallux.koudou.models.MemberModel;
import com.henallux.koudou.models.NewsModel;
import com.henallux.koudou.models.PagedResponseModel;
import com.henallux.koudou.models.enums.SortDirection;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface MembersService {
    @GET("api/1/Member")
    Call<PagedResponseModel<MemberModel>> get(@Query("startIndex") int startIndex, @Query("count") int count, @Query("sort") String sort, @Query("sortDirection") SortDirection sortDirection);
    @GET("api/1/Member/{id}")
    Call<MemberFullModel> get(@Path("id") int id);
    @DELETE("api/1/Member/{id}")
    Call<Void> delete(@Path("id") int id);
    @POST("api/1/Member")
    Call<MemberFullModel> create(@Body MemberFullModel model);
    @PUT("api/1/Member/{id}")
    Call<MemberFullModel> update(@Body MemberFullModel model, @Path("id") int id);
}
