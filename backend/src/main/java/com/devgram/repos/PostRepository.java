package com.devgram.repos;



import com.devgram.dto.interfaces.PostFlatData;
import com.devgram.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    @Query(
            value = """
            SELECT 
              p.post_id AS postId,
              p.title AS title,
              p.description AS description,
              p.timestamp AS timestamp,
              p.repo_link AS repoLink,
              u.id AS userId,
              u.full_name AS fullName,
              u.profile_picture_url AS profilePictureUrl,
              ps.skill_id AS skillId
            FROM posts p
            JOIN users u ON p.created_by_user_id = u.id
            LEFT JOIN post_skill ps ON ps.post_id = p.post_id
            ORDER BY p.timestamp DESC
            LIMIT :size OFFSET :offset
            """,
            nativeQuery = true
    )
    List<PostFlatData> getPaginatedPosts(@Param("offset") int offset, @Param("size") int size);

    @Query(
            value = """
        SELECT 
          p.post_id AS postId,
          p.title AS title,
          p.description AS description,
          p.timestamp AS timestamp,
          p.repo_link AS repoLink,
          u.id AS userId,
          u.full_name AS fullName,
          u.email AS email,
          u.user_name AS userName,
          u.profile_picture_url AS profilePictureUrl,
          ps.skill_id AS skillId,
          pc.user_id AS collaboratorId
        FROM posts p
        JOIN users u ON p.created_by_user_id = u.id
        LEFT JOIN post_skill ps ON ps.post_id = p.post_id
        LEFT JOIN post_collaborators pc ON pc.post_id = p.post_id
        WHERE u.id = :userId
        ORDER BY p.timestamp DESC
        """,
            nativeQuery = true
    )
    List<PostFlatData> findByCreatedById(@Param("userId") UUID userId);

}