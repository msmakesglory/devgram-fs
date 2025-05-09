package com.devgram.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReqDto {
    private String fullName;
    private String userName;
    private String email;
    private String profilePictureUrl;
    private String bio;
    private String location;
    private String website;
    private Date joinDate;
    private String githubUrl;
    private String linkedinUrl;
    private List<Long> skillIds;
    private List<String> newSkills;

    public void fix(){
        if (this.skillIds == null){
            this.skillIds = new ArrayList<>();
        }
        if (this.newSkills == null){
            this.newSkills = new ArrayList<>();
        }
    }
}
