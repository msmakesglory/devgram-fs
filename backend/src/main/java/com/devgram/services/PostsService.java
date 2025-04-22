package com.devgram.services;

import com.devgram.models.Post;
import com.devgram.repos.PostRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostsService {

    private final PostRepository postRepository;
    private final MyUserService myUserService;
    public PostsService(PostRepository postRepository, MyUserService myUserService) {
        this.postRepository = postRepository;
        this.myUserService = myUserService;
    }

    public Optional<List<Post>> getPosts() {
        List<Post> posts = postRepository.findAll();
        return Optional.of(posts);
    }

    public Optional<Post> getPost(String postId) {
        return postRepository.findById(UUID.fromString(postId));
    }

    public boolean addNewPost(Post post) {
        if (post == null) {
            return false;
        }
        post.setCreatedBy(myUserService.getUser());
        postRepository.save(post);
        return true;
    }

    public boolean deletePost(Post post) {
        if (post == null || post.getPostId() == null) {
            return false;
        }
        postRepository.delete(post);
        return true;
    }

    public boolean updatePost(Post post) {
        if (post == null || post.getPostId() == null || !postRepository.existsById(post.getPostId())) {
            return false;
        }
        postRepository.save(post);
        return true;
    }
}

