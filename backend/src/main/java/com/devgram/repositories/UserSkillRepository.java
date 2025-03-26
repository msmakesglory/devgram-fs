package com.devgram.repositories;

import com.devgram.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserSkillRepository extends JpaRepository<UserSkill, UserSkillId> {

}