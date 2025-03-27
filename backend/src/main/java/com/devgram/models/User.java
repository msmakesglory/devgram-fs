package com.devgram.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;


import java.util.UUID;


@Entity
@Table(name = "users")
@Setter
@Getter
public class User {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(updatable = false, nullable = false, unique = true)
    private UUID userId;

    @Column(nullable = false)
    private String email;

    @Column()
    private String profilePictureUrl;

    @Column
    private String fullName;

    @Column()
    private String username;

}
