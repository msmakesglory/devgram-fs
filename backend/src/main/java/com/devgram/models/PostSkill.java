package com.devgram.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "postSkills")
@Getter
@Setter
public class PostSkill implements Serializable {

    @EmbeddedId
    private PostSkillId id;

    @ManyToOne
    @MapsId("postId") // Matches the field name in PostSkillId
    @JoinColumn(nullable = false)
    private Post post;

    @ManyToOne
    @MapsId("skillId") // Matches the field name in PostSkillId
    @JoinColumn(nullable = false)
    private Skill skill;

    public PostSkill() {}

    public PostSkill(Post post, Skill skill) {
        this.id = new PostSkillId(post.getPostId(), skill.getSkillId());
        this.post = post;
        this.skill = skill;
    }

}