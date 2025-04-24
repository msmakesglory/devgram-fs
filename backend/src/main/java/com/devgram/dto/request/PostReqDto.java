package com.devgram.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PostReqDto {
    private String title;
    private String description;
    private UUID createdById;
    private List<Long> skillIds;
    private List<String> newSkills;
    private String repoLink;
    private List<UUID> collaboratorIds;

    public void fix(){
        if (this.skillIds == null){
           skillIds = new ArrayList<>();
        }
        if (this.newSkills == null){
            newSkills = new ArrayList<>();
        }
        if (this.collaboratorIds == null){
            this.collaboratorIds = new ArrayList<>();
        }
    }
}