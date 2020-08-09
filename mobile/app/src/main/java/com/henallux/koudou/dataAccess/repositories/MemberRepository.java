package com.henallux.koudou.dataAccess.repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.henallux.koudou.App;
import com.henallux.koudou.R;
import com.henallux.koudou.dataAccess.network.MembersService;
import com.henallux.koudou.models.MemberFullModel;
import com.henallux.koudou.models.MemberModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MemberRepository extends BaseRepository{
    private static MemberRepository instance;
    private MembersService membersService;

    private MutableLiveData<PagedResponseModel<MemberModel>> members = new MutableLiveData<>();
    public LiveData<PagedResponseModel<MemberModel>> getMembers() {
        return members;
    }

    private MutableLiveData<MemberFullModel> selectedMember = new MutableLiveData<>();
    public LiveData<MemberFullModel> getSelectedMember() {
        return selectedMember;
    }

    public static MemberRepository getInstance(App context){
        if(instance == null){
            instance = new MemberRepository(context);
        }
        return instance;
    }
    private MemberRepository(App context){
        super(context);
        membersService = (MembersService) context.getService(MembersService.class);
    }

    public void get(PageRequestOptions option){
        membersService.get(option.getStartIndex(), option.getCount(), option.getSort(), option.getSortDirection()).enqueue(new Callback<PagedResponseModel<MemberModel>>() {
            @Override
            public void onResponse(Call<PagedResponseModel<MemberModel>> call, Response<PagedResponseModel<MemberModel>> response) {
                if(response.isSuccessful()){
                    PagedResponseModel<MemberModel> model = response.body();
                    successAction.setValue("GetMembers");
                    members.setValue(model);
                } else {
                    treatError(response,"GetMembers", app.getString(R.string.error_member_get_fail));
                }
            }

            @Override
            public void onFailure(Call<PagedResponseModel<MemberModel>> call, Throwable t) {
                treatError(t,"GetMembers", app.getString(R.string.error_member_get_fail));
            }
        });
    }

    public void getOne(int id){
        membersService.get(id).enqueue(new Callback<MemberFullModel>() {
            @Override
            public void onResponse(Call<MemberFullModel> call, Response<MemberFullModel> response) {
                if(response.isSuccessful()){
                    MemberFullModel model = response.body();
                    successAction.setValue("GetOneMember");
                    selectedMember.setValue(model);
                } else {
                    treatError(response,"GetOneMember", app.getString(R.string.error_member_getone_fail));
                }
            }

            @Override
            public void onFailure(Call<MemberFullModel> call, Throwable t) {
                treatError(t,"GetOneMember", app.getString(R.string.error_member_getone_fail));
            }
        });
    }

    public void create(MemberFullModel model){
        membersService.create(model).enqueue(new Callback<MemberFullModel>() {
            @Override
            public void onResponse(Call<MemberFullModel> call, Response<MemberFullModel> response) {
                if(response.isSuccessful()){
                    MemberFullModel model = response.body();
                    successAction.setValue("CreateMember");
                    selectedMember.setValue(null);
                } else {
                    treatError(response,"CreateMember", app.getString(R.string.error_member_create_fail));
                }
            }

            @Override
            public void onFailure(Call<MemberFullModel> call, Throwable t) {
                treatError(t,"CreateMember", app.getString(R.string.error_member_create_fail));
            }
        });
    }

    public void update(MemberFullModel model){
        membersService.update(model, model.getId()).enqueue(new Callback<MemberFullModel>() {
            @Override
            public void onResponse(Call<MemberFullModel> call, Response<MemberFullModel> response) {
                if(response.isSuccessful()){
                    MemberFullModel model = response.body();
                    successAction.setValue("UpdateMember");
                    selectedMember.setValue(null);
                } else {
                    treatError(response,"UpdateMember", app.getString(R.string.error_member_update_fail));
                }
            }

            @Override
            public void onFailure(Call<MemberFullModel> call, Throwable t) {
                treatError(t,"UpdateMember", app.getString(R.string.error_member_update_fail));
            }
        });
    }

    public void delete(int id){
        membersService.delete(id).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                if(response.isSuccessful()){
                    successAction.setValue("DeleteMember");
                    selectedMember.setValue(null);
                    get(new PageRequestOptions(0, 20, null, null));
                } else {
                    treatError(response,"DeleteMember", app.getString(R.string.error_member_delete_fail));
                }
            }

            @Override
            public void onFailure(Call call, Throwable t) {
                treatError(t,"DeleteMember", app.getString(R.string.error_member_delete_fail));
            }
        });
    }
    public void clearSelectedMember() {
        selectedMember.setValue(null);
    }
}
