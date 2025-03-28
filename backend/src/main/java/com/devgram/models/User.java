package com.devgram.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(updatable = false, nullable = false, unique = true)
    private UUID id;

    private String fullName;

    private String userName;

    private String email;

    private String profilePictureUrl;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_skill",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )

    private List<Skill> skills = new ArrayList<>();

    public User() {}

    public User(String fullName, String userName, String email, String profilePictureUrl){
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.profilePictureUrl = profilePictureUrl;
    }
}