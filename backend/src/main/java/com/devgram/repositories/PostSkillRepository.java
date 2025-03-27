package com.devgram.repositories;

import com.devgram.models.PostSkill;
import com.devgram.models.PostSkillId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostSkillRepository extends JpaRepository<PostSkill, PostSkillId> {
}