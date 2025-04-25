package com.devgram.services;

import com.devgram.dto.interfaces.PostFlatData;
import com.devgram.dto.request.PostReqDto;
import com.devgram.dto.response.PostResDto;
import com.devgram.dto.response.UserResDto;
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
    private final SkillService skillService;

    public PostsService(PostRepository postRepository, MyUserService myUserService, SkillRepository skillRepository, UserRepository userRepository, SkillService skillService) {
        this.postRepository = postRepository;
        this.myUserService = myUserService;
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
        this.skillService = skillService;
    }

    public List<PostResDto> getPosts() {
        return postRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<PostResDto> getPost(String postId) {
        return postRepository.findById(UUID.fromString(postId)).map(this::convertToDto);
    }


    public List<PostResDto> getPaginatedPosts(int page, int size) {
        int offset = page * size;
        List<PostFlatData> flatDataList = postRepository.getPaginatedPosts(offset, size);
        Map<UUID, PostResDto> postMap = new LinkedHashMap<>();

        for (PostFlatData flat : flatDataList) {
            UUID postId = flat.getPostId();

            PostResDto dto = postMap.computeIfAbsent(postId, id -> {
                UserResDto userDto = new UserResDto();
                userDto.setId(flat.getUserId());
                userDto.setFullName(flat.getFullName());
                userDto.setProfilePictureUrl(flat.getProfilePictureUrl());

                return new PostResDto(
                        flat.getPostId(),
                        flat.getTitle(),
                        flat.getDescription(),
                        flat.getTimestamp(),
                        userDto,
                        flat.getRepoLink(),
                        0,
                        new ArrayList<>(),
                        new ArrayList<>()
                );
            });

            if (flat.getSkillId() != null && !dto.getSkillIds().contains(flat.getSkillId())) {
                dto.getSkillIds().add(flat.getSkillId());
            }
        }

        return new ArrayList<>(postMap.values());
    }



    public boolean addNewPost(PostReqDto dto) {
//        this is to ensure quality
        dto.fix();
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setCreatedBy(myUserService.getUser());
        return fillPostWithDto(dto, post);
    }

    private boolean fillPostWithDto(PostReqDto dto, Post post) {
        post.setCollaborators(userRepository.findAllById(dto.getCollaboratorIds()));
        post.setRepoLink(dto.getRepoLink());
        List<Skill> skills = new ArrayList<>(skillRepository.findAllById(dto.getSkillIds()));

        if(!dto.getNewSkills().isEmpty()) {
            for(String skill : dto.getNewSkills()) {
                skills.add(skillService.addSkill(skill));
            }
        }
        post.setSkills(skills);

        postRepository.save(post);
        return true;
    }

    public boolean updatePost(UUID id, PostReqDto dto) {

        dto.fix();

        Optional<Post> existing = postRepository.findById(id);
        if (existing.isEmpty()) return false;

        Post post = existing.get();
        post.setTitle(dto.getTitle());
        post.setDescription(dto.getDescription());
        post.setSkills(skillRepository.findAllById(dto.getSkillIds()));
        return fillPostWithDto(dto, post);
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
                myUserService.convertToDto(post.getCreatedBy()),
                post.getRepoLink(),
                0,
                post.getSkills().stream().map(Skill::getSkillId).collect(Collectors.toList()),
                post.getCollaborators().stream().map(MyUser::getId).collect(Collectors.toList())
        );
    }

    public List<PostResDto> getPostsByUserId(UUID userId) {
        // Fetch all flat data for the user's posts
        List<PostFlatData> flatDataList = postRepository.findByCreatedById(userId);

        // Group flat data by postId
        Map<UUID, PostResDto> postMap = new LinkedHashMap<>();
        for (PostFlatData flatData : flatDataList) {
            UUID postId = flatData.getPostId();

            // Create a new PostResDto if it doesn't already exist
            PostResDto dto = postMap.computeIfAbsent(postId, id -> {
                PostResDto newDto = new PostResDto();
                newDto.setPostId(id);
                newDto.setTitle(flatData.getTitle());
                newDto.setDescription(flatData.getDescription());
                newDto.setTimestamp(flatData.getTimestamp());

                UserResDto userResDto = new UserResDto();
                userResDto.setId(flatData.getUserId());
                userResDto.setFullName(flatData.getFullName());
                userResDto.setProfilePictureUrl(flatData.getProfilePictureUrl());

                newDto.setCreatedById(userResDto);
                newDto.setRepoLink(flatData.getRepoLink());
                newDto.setSkillIds(new ArrayList<>());
                newDto.setCollaboratorIds(new ArrayList<>());

                return newDto;
            });

            // Add skillId and collaboratorId to the respective lists
            if (flatData.getSkillId() != null) {
                dto.getSkillIds().add(flatData.getSkillId());
            }
            if (flatData.getCollaboratorId() != null) {
                dto.getCollaboratorIds().add(flatData.getCollaboratorId());
            }
        }

        // Return the grouped posts as a list
        return new ArrayList<>(postMap.values());
    }

    private PostResDto mapToPostResDto(PostFlatData flatData, MyUser user) {
        PostResDto dto = new PostResDto();
        dto.setPostId(flatData.getPostId());
        dto.setTitle(flatData.getTitle());
        dto.setDescription(flatData.getDescription());
        dto.setTimestamp(flatData.getTimestamp());

        UserResDto userResDto = new UserResDto();
        userResDto.setId(flatData.getUserId());
        userResDto.setFullName(flatData.getFullName());
        userResDto.setProfilePictureUrl(flatData.getProfilePictureUrl());

        dto.setCreatedById(userResDto);
        dto.setRepoLink(flatData.getRepoLink());

        // Include all skills of the user
        dto.setSkillIds(user.getSkillIds());

        // Add collaborator ID (if present)
        if (flatData.getCollaboratorId() != null) {
            dto.setCollaboratorIds(Collections.singletonList(flatData.getCollaboratorId()));
        } else {
            dto.setCollaboratorIds(Collections.emptyList());
        }

        return dto;
    }
}