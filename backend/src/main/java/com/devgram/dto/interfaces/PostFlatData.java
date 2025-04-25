package com.devgram.dto.interfaces;

import java.time.LocalDateTime;
import java.util.UUID;

public interface PostFlatData {
    UUID getPostId();
    String getTitle();
    String getDescription();
    LocalDateTime getTimestamp();
    String getRepoLink();

    UUID getUserId();
    String getFullName();
    String getProfilePictureUrl();
    String getEmail();
    String getUserName();

    Long getSkillId();
    UUID getCollaboratorId();
}

