package com.devgram.service;

import com.devgram.models.*;
import com.devgram.repositories.PostRepository;
import com.devgram.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public void createPost(UUID userId, String title, String description) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Post post = new Post();
        post.setUser(user);
        post.setTitle(title);
        post.setDescription(description);

        postRepository.save(post);

        System.out.println("New Post Created...");
    }

}
