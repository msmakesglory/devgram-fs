package com.devgram.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Data
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class MyUser implements UserDetails {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(updatable = false, nullable = false, unique = true)
    private UUID id;

    private String fullName;

    private String userName;

    private String email;

    private String profilePictureUrl;

    private String bio;

    private String location;

    private String website;

    private Date joinDate;

    @ColumnDefault("0")
    private Integer projectCount;

    @ColumnDefault("0")
    private Integer impressionsCount;

    private String githubUrl;

    private String linkedinUrl;
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "user_skill",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public List<Long> getSkillIds() {
        List<Long> skillIds = new ArrayList<>();
        for (Skill skill : skills) {
            skillIds.add(skill.getSkillId());
        }

        return skillIds;
    }
}