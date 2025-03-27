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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserSkill userSkill = (UserSkill) o;
        return Objects.equals(id, userSkill.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
