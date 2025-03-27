package com.devgram.repositories;

import com.devgram.models.PostTeam;
import com.devgram.models.PostTeamId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTeamRepository extends JpaRepository<PostTeam, PostTeamId> {
}