package com.henallux.koudou.viewModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;

import com.henallux.koudou.App;
import com.henallux.koudou.dataAccess.repositories.MemberRepository;
import com.henallux.koudou.models.ErrorModel;
import com.henallux.koudou.models.MemberFullModel;
import com.henallux.koudou.models.MemberModel;
import com.henallux.koudou.models.PageRequestOptions;
import com.henallux.koudou.models.PagedResponseModel;

public class MemberViewModel extends ViewModel {
    public boolean isReadOnly;
    public MemberFullModel model;
    public boolean getIsMemberSelected(){
        return selectedMemberId > 0;
    }

    private MemberRepository memberRepository;
    private int selectedMemberId = -1;

    public MemberViewModel(){
        App app = App.getInstance();
        memberRepository = MemberRepository.getInstance(app);
    }

    public LiveData<PagedResponseModel<MemberModel>> getMembers(){
        return memberRepository.getMembers();
    }

    public LiveData<MemberFullModel> getSelectedMember(){
        return memberRepository.getSelectedMember();
    }

    public LiveData<String> getSuccessAction(){
        return memberRepository.getSuccessAction();
    }

    public LiveData<ErrorModel> getError(){
        return memberRepository.getError();
    }

    public void loadMembers(){
        memberRepository.get(new PageRequestOptions(0, 10, null, null));
    }

    public void loadNextMembers(int page) {
        memberRepository.get(new PageRequestOptions((page * 10) - 1, 10, null, null));
    }

    public void selectMember(int id){
        selectedMemberId = id;
        if(selectedMemberId == -1) {
            memberRepository.clearSelectedMember();
        }
    }

    public void loadDetails(){
        memberRepository.getOne(selectedMemberId);
    }

    public void createMember(){
        memberRepository.create(model);
    }

    public void deleteMember(){
        memberRepository.delete(selectedMemberId);
        this.selectedMemberId = -1;
    }

    public void updateMember() {
        memberRepository.update(model);
    }

}