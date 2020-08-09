package com.henallux.koudou.models;

public class MemberModel extends BaseModel {
    private String lastName;
    private String firstName;
    private String section;
    private String role;

    public MemberModel(String lastName, String firstName, String section, String role) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.section = section;
        this.role = role;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
