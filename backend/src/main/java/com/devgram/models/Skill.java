package com.devgram.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import java.util.UUID;

@Entity
@Table(name = "skill")
@Setter
@Getter
public class Skill {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(nullable = false, unique = true)
    private UUID skillId;

    @Column(nullable = false, unique = true)
    private String skillName;

}
