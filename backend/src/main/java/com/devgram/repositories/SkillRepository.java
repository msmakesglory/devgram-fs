package com.devgram.repositories;

import com.devgram.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllById(Iterable<Long> ids);
}