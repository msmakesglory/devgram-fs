package com.devgram.services;

import com.devgram.models.*;
import com.devgram.models.PostTeam.Role;
import com.devgram.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PostTeamService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostTeamRepository postTeamRepository;

    public void addCollaborator(UUID postId, UUID userId, Role role) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post Not Found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        PostTeam postTeam = new PostTeam(post, user, role);

        postTeamRepository.save(postTeam);

        System.out.println("new Collaborator added");
    }
}