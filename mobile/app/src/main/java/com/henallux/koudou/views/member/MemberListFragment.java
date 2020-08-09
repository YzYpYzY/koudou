package com.henallux.koudou.views.member;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.henallux.koudou.R;
import com.henallux.koudou.models.MemberModel;
import com.henallux.koudou.models.PagedResponseModel;
import com.henallux.koudou.viewModels.MemberViewModel;
import com.henallux.koudou.views.tools.EndlessRecyclerViewScrollListener;
import com.henallux.koudou.views.tools.OnItemSelectedListener;

import java.util.ArrayList;
import java.util.List;

public class MemberListFragment extends Fragment {

    private MemberViewModel viewModel;
    private MemberListFragment.MemberAdapter adapter;
    private EndlessRecyclerViewScrollListener scrollListener;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        super.onCreateView(inflater,container, savedInstanceState);
        this.adapter = new MemberListFragment.MemberAdapter();
        View view = inflater.inflate(R.layout.fragment_member_list, container, false);
        RecyclerView memberRecyclerView = view.findViewById(R.id.members_list);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this.getContext());
        memberRecyclerView.setLayoutManager(linearLayoutManager);
        memberRecyclerView.setAdapter(adapter);
        scrollListener = new EndlessRecyclerViewScrollListener(linearLayoutManager) {
            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view) {
                // Triggered only when new data needs to be appended to the list
                // Add whatever code is needed to append new items to the bottom of the list
                loadNextMember(page);
            }
        };
        // Adds the scroll listener to RecyclerView
        memberRecyclerView.addOnScrollListener(scrollListener);
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel = ViewModelProviders.of(getActivity()).get(MemberViewModel.class);
        viewModel.getMembers().observe(getViewLifecycleOwner(), new Observer<PagedResponseModel<MemberModel>>() {
            @Override
            public void onChanged(PagedResponseModel<MemberModel> member) {
                adapter.addMembers(member);
            }
        });
        viewModel.loadMembers();
    }

    private void loadNextMember(int page) {
        viewModel.loadNextMembers(page);
    }

    private class MemberViewHolder extends RecyclerView.ViewHolder {

        public TextView firstname;
        public TextView lastname;

        public MemberViewHolder(@NonNull View itemView, OnItemSelectedListener listener) {
            super(itemView);
            firstname = itemView.findViewById(R.id.member_firstname);
            lastname = itemView.findViewById(R.id.member_lastname);
            itemView.setOnClickListener(view -> {
                int currentPosition = getAdapterPosition();
                listener.onItemSelected(currentPosition);
            });
        }
    }

    private class MemberAdapter extends RecyclerView.Adapter<MemberListFragment.MemberViewHolder> {
        private List<MemberModel> members = new ArrayList<MemberModel>();
        private int selectedPosition = -1;

        @NonNull
        @Override
        public MemberListFragment.MemberViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            ConstraintLayout v = (ConstraintLayout) LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_list_member, parent, false);
            MemberListFragment.MemberViewHolder vh = new MemberListFragment.MemberViewHolder(v,
                    new OnItemSelectedListener() {
                        @Override
                        public void onItemSelected(int position) {
                            selectedPosition = position;
                            viewModel.selectMember(members.get(position).getId());
                            notifyDataSetChanged();
                        }
                    });
            return vh;
        }
        @Override
        public void onBindViewHolder(@NonNull MemberListFragment.MemberViewHolder holder, int position) {
            MemberModel m = members.get(position);
            holder.firstname.setText(m.getFirstName());
            holder.lastname.setText(m.getLastName());
            if(position == selectedPosition){
                holder.itemView.setSelected(true);
            } else {
                holder.itemView.setSelected(false);
            }
        }

        @Override
        public int getItemCount() {
            return members == null ? 0 : members.size();
        }

        public void addMembers(PagedResponseModel<MemberModel> members) {
            if(members.getOptions().getStartIndex() == 0) {
                this.members.clear();
            }
            this.members.addAll(members.getValues());
            notifyDataSetChanged();
        }
    }
}