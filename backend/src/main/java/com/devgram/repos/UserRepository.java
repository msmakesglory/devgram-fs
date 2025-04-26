package com.devgram.repos;


import com.devgram.models.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends JpaRepository<MyUser, UUID> {
    List<MyUser> findAllById(Iterable<UUID> ids);

    Optional<MyUser> findByEmail(String email);

    @Override
    Optional<MyUser> findById(UUID id);
}