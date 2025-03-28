package com.devgram.repositories;

import com.devgram.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findAllById(Iterable<UUID> ids);
}