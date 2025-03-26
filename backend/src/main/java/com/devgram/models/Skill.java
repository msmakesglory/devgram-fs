package com.devgram.models;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;
import java.util.UUID;

@Entity
@Table(name = "skill")
public class Skill {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "skillId", nullable = false, unique = true)
    private UUID skillId;

    @Column(name = "skillName", nullable = false, unique = true)
    private String skillName;

}
