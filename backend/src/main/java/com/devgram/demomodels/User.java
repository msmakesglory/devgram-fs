package com.devgram.demomodels;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String email;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_skill", // Name of the join table
            joinColumns = @JoinColumn(name = "user_id"), // Foreign key for User
            inverseJoinColumns = @JoinColumn(name = "skill_id") // Foreign key for Skill
    )
    private List<Skill> skills = new ArrayList<>();
}