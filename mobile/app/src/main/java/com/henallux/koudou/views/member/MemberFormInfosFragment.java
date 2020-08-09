package com.henallux.koudou.views.member;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.henallux.koudou.R;
import com.henallux.koudou.viewModels.MemberViewModel;
import com.henallux.koudou.views.tools.SexConverter;
import com.henallux.koudou.views.tools.ValidateFragment;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mobsandgeeks.saripaar.annotation.Pattern;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MemberFormInfosFragment extends Fragment implements Validator.ValidationListener, ValidateFragment {

    @BindView(R.id.member_form_lastname_text)
    @NotEmpty(messageResId = R.string.valid_lastname_required)
    public TextView lastname;
    @BindView(R.id.member_form_firstname_text)
    @NotEmpty(messageResId = R.string.valid_firstname_required)
    public TextView firstname;
    @BindView(R.id.member_form_birthdate_text)
    @Pattern(regex = "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$", messageResId = R.string.valid_birthdate_format)
    public TextView birthdate;
    @BindView(R.id.member_form_sex_text)
    public Spinner sex;
    @BindView(R.id.member_form_comment_text)
    public TextView comment;

    private String sexValueSelected;
    private Validator validator;
    private MemberViewModel viewModel;
    private MemberActivity activity;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activity = (MemberActivity) getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_form_member_infos, container, false);
        ButterKnife.bind(this,view);
        validator = new Validator(this);
        validator.setValidationListener(this);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_spinner_dropdown_item, SexConverter.SEXS);
        sex.setAdapter(adapter);
        sex.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                sexValueSelected = ((TextView)view).getText().toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        viewModel = ViewModelProviders.of(getActivity()).get(MemberViewModel.class);
        viewModel.getSelectedMember().observe(getActivity(), memberModel -> {
            if(memberModel != null){
                lastname.setText(memberModel.getLastName());
                firstname.setText(memberModel.getFirstName());
                int positionSexFound = -1;
                String sexValue = SexConverter.charToText(memberModel.getSex());
                for(int i = 0; i < SexConverter.SEXS.length && positionSexFound < 0; i++){
                    if(SexConverter.SEXS[i].equals(sexValue)){
                        positionSexFound = i;
                    }
                }
                if(positionSexFound < 0 ){ positionSexFound = 0;}
                sex.setSelection(positionSexFound);
                birthdate.setText(memberModel.getBirthdate());
                comment.setText(memberModel.getComment());
            }
            if(viewModel.isReadOnly){
                lastname.setEnabled(false);
                firstname.setEnabled(false);
                birthdate.setEnabled(false);
                sex.setEnabled(false);
                comment.setEnabled(false);
            }
        });
    }

    public void validate() {
        validator.validate();
    }

    @Override
    public void onValidationSucceeded() {
        viewModel.model.setLastName(lastname.getText().toString());
        viewModel.model.setFirstName(firstname.getText().toString());
        viewModel.model.setSex(SexConverter.textToChar(sexValueSelected));
        viewModel.model.setBirthdate(birthdate.getText().toString());
        viewModel.model.setComment(comment.getText().toString());

        ((MemberFormFragment)getParentFragment()).setInfosValidationResult(true);
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        for (ValidationError error : errors) {
            View view = error.getView();
            String message = error.getCollatedErrorMessage(activity);

            // Display error messages ;)
            if (view instanceof EditText) {
                ((EditText) view).setError(message);
            } else {
                Toast.makeText(activity, message, Toast.LENGTH_LONG).show();
            }
        }
        ((MemberFormFragment)getParentFragment()).setInfosValidationResult(false);
    }
}