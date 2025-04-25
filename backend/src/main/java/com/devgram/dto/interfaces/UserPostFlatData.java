package com.devgram.dto.interfaces;

import java.util.UUID;
import java.time.LocalDateTime;

public interface UserPostFlatData {
    UUID getPostId();
    String getTitle();
    String getDescription();
    LocalDateTime getTimestamp();
    String getRepoLink();
    Long getSkillId();
    UUID getCollaboratorId();
}