package com.devgram.repositories;

import com.devgram.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface SkillRepository extends JpaRepository<Skill, UUID> {

}