package com.devgram.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillResDto {
    private long skillId;
    private String skillName;
    private List<UUID> userIds;
}
