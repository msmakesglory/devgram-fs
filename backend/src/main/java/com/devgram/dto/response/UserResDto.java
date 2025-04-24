package com.devgram.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResDto {
    private UUID id;
    private String fullName;
    private String userName;
    private String email;
    private String profilePictureUrl;
    private String bio;
    private String location;
    private String website;
    private Date joinDate;
    private int projectCount;
    private int impressionsCount;
    private List<Long> skillIds = new ArrayList<>();
}