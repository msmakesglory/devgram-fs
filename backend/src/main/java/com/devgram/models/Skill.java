package com.devgram.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "skills")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long skillId;

    @Column(nullable = false, unique = true)
    private String skillName;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Skill skill = (Skill) o;
        return Objects.equals(getSkillName(), skill.getSkillName());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getSkillName());
    }
}
//    @ManyToMany(mappedBy = "skills",
//            fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.DETACH,
//                    CascadeType.MERGE,
//                    CascadeType.PERSIST,
//                    CascadeType.REFRESH
//            }
//    )
//    private List<MyUser> users = new ArrayList<>();