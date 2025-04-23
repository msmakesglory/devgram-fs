package com.devgram.dto.response;

import com.devgram.models.MyUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResDto {
    private UUID postId;
    private String title;
    private String description;
    private LocalDateTime timestamp;
    private MyUser createdById;
    private List<Long> skillIds;
    private List<UUID> collaboratorIds;
}