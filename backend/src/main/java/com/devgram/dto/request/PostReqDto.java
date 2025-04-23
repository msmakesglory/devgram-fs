package com.devgram.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostReqDto {
    private String title;
    private String description;
    private UUID createdById;
    private List<Long> skillIds;
    private List<UUID> collaboratorIds;
}
