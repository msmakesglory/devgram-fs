package com.devgram.repos;


import com.devgram.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllById(Iterable<Long> ids);

    Optional<Skill> findBySkillName(String skillName);

}