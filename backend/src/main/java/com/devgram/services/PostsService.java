package com.devgram.services;

import com.devgram.dto.request.PostReqDto;
import com.devgram.dto.response.PostResDto;
import com.devgram.models.MyUser;
import com.devgram.models.Post;
import com.devgram.models.Skill;
import com.devgram.repos.PostRepository;
import com.devgram.repos.SkillRepository;
import com.devgram.repos.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostsService {

    private final PostRepository postRepository;
    private final MyUserService myUserService;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public PostsService(PostRepository postRepository, MyUserService myUserService, SkillRepository skillRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.myUserService = myUserService;
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public List<PostResDto> getPosts() {
        return postRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<PostResDto> getPost(String postId) {
        return postRepository.findById(UUID.fromString(postId)).map(this::convertToDto);
    }


    public List<PostResDto> getPaginatedPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findAll(pageable)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    public boolean addNewPost(PostReqDto dto) {
        if (dto == null) return false;

        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setCreatedBy(myUserService.getUser());
        post.setSkills(skillRepository.findAllById(dto.getSkillIds()));
        post.setCollaborators(userRepository.findAllById(dto.getCollaboratorIds()));

        postRepository.save(post);
        return true;
    }

    public boolean updatePost(UUID id, PostReqDto dto) {

        Optional<Post> existing = postRepository.findById(id);
        if (existing.isEmpty()) return false;

        Post post = existing.get();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setSkills(skillRepository.findAllById(dto.getSkillIds()));
        post.setCollaborators(userRepository.findAllById(dto.getCollaboratorIds()));

        postRepository.save(post);
        return true;
    }

    public boolean deletePost(UUID id) {
        if (!postRepository.existsById(id)) return false;
        postRepository.deleteById(id);
        return true;
    }

    private PostResDto convertToDto(Post post) {
        return new PostResDto(
                post.getPostId(),
                post.getTitle(),
                post.getDescription(),
                post.getTimestamp(),
                post.getCreatedBy(),
                post.getSkills().stream().map(Skill::getSkillId).collect(Collectors.toList()),
                post.getCollaborators().stream().map(MyUser::getId).collect(Collectors.toList())
        );
    }
}
