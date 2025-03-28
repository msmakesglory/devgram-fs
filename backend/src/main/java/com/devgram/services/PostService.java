package com.devgram.services;

import com.devgram.repositories.*;
import com.devgram.models.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    // To Create Post
    public void createPost(UUID userId, String title, String description) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not Found"));

        Post post = new Post(user, title, description);

        postRepository.save(post);

        System.out.println("New Post Created By: " + user.getFullName());

    }

    @Transactional
    public void addSkillsToPost(UUID postId, List<Long> skillIds) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post Not Found"));

        List<Skill> skills = skillRepository.findAllById(skillIds);
        if (skills.size() != skillIds.size()) {
            throw new RuntimeException("Some skills were not found");
        }
        post.getSkills().addAll(skills);
        postRepository.save(post);

        System.out.println("new skills added for post: " +  post.getTitle());
    }

    @Transactional
    public void addCollaborators(UUID postId, List<UUID> userIds) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        List<User> users = userRepository.findAllById(userIds);
        if (users.size() != userIds.size()) {
            throw new RuntimeException("Some users were not found");
        }
        post.getCollaborators().addAll(users);
        postRepository.save(post);

        System.out.println("new collaborators added");
    }
}
