package com.devgram.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class PostSkillId implements Serializable {

    @Column(nullable = false)
    private UUID postId;

    @Column(nullable = false)
    private UUID skillId;

    public PostSkillId() {}

    public PostSkillId(UUID postId, UUID skillId) {
        this.postId = postId;
        this.skillId = skillId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostSkillId that = (PostSkillId) o;
        return Objects.equals(postId, that.postId) && Objects.equals(skillId, that.skillId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, skillId);
    }

}
