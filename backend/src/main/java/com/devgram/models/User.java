package com.devgram.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String userId;
    private String email;
    private String profilePicture;
    private String fullName;
    private String username;
}
