package com.devgram.controllers;


import com.devgram.dto.request.PostReqDto;
import com.devgram.dto.response.PostResDto;
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
    public ResponseEntity<List<PostResDto>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<PostResDto> posts = postsService.getPaginatedPosts(page, size);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResDto> getPostById(@PathVariable UUID id) {
        Optional<PostResDto> post = postsService.getPost(id.toString());
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> addPost(@RequestBody PostReqDto dto) {
        System.out.println(dto);
        boolean success = postsService.addNewPost(dto);
        if (success) return ResponseEntity.ok("Post created successfully.");
        return ResponseEntity.badRequest().body("Failed to create post.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable UUID id, @RequestBody PostReqDto dto) {
        boolean success = postsService.updatePost(id, dto);
        if (success) return ResponseEntity.ok("Post updated successfully.");
        return ResponseEntity.badRequest().body("Failed to update post.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable UUID id) {
        boolean success = postsService.deletePost(id);
        if (success) return ResponseEntity.ok("Post deleted successfully.");
        return ResponseEntity.badRequest().body("Failed to delete post.");
    }
}
