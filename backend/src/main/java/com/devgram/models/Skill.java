package com.devgram.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long skillId;

    private String skillName;

    @ManyToMany(mappedBy = "skills", cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();

}