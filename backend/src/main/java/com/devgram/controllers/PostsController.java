package com.devgram.controllers;


import com.devgram.models.Post;
import com.devgram.services.PostsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostsController {

    private final PostsService postsService;

    public PostsController(PostsService postsService) {
        this.postsService = postsService;
    }


    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        Optional<List<Post>> posts = postsService.getPosts();
        return posts.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable UUID id) {
        Optional<Post> post = postsService.getPost(id.toString());
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addPost(@RequestBody Post post) {
        boolean success = postsService.addNewPost(post);
        if (success) {
            return ResponseEntity.ok("Post created successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to create post.");
        }
    }

    @PutMapping
    public ResponseEntity<String> updatePost(@RequestBody Post post) {
        boolean success = postsService.updatePost(post);
        if (success) {
            return ResponseEntity.ok("Post updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update post.");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deletePost(@RequestBody Post post) {
        boolean success = postsService.deletePost(post);
        if (success) {
            return ResponseEntity.ok("Post deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete post.");
        }
    }
}
