package com.devgram.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills")
@Data
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long skillId;

    private String skillName;

    @ManyToMany(mappedBy = "skills", cascade = CascadeType.ALL) // Mapped by the skills field in User
    private List<User> users = new ArrayList<>();

    public Skill() {}

    public Skill(String skillName) {
        this.skillName = skillName;
    }
}