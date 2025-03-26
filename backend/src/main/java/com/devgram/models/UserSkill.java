package com.devgram.models;


import jakarta.persistence.*;


import java.util.Objects;

@Entity
@Table(name = "userSkills")
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

    public UserSkillId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public void setId(UserSkillId id) {
        this.id = id;
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
