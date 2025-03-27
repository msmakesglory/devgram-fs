package com.devgram.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.util.Objects;


@Entity
@Table(name = "userSkills")
@Setter
@Getter
public class UserSkill {

    @EmbeddedId
    private UserSkillId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @MapsId("skillId")
    @JoinColumn(nullable = false)
    private Skill skill;

    public UserSkill() {}

    public UserSkill(User user, Skill Skill) {
        this.id = new UserSkillId(user.getUserId(), skill.getSkillId());
    }

}
