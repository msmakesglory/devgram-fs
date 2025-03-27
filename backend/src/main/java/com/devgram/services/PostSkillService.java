package com.devgram.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.devgram.repositories.*;
import com.devgram.models.*;

import java.util.UUID;

@Service
public class PostSkillService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private PostSkillRepository postSkillRepository;

    public void addPostSkill(UUID postId, UUID skillId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post Not Found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill Not Found"));

        PostSkill postSkill = new PostSkill(post, skill);

        postSkillRepository.save(postSkill);

        System.out.println("post skill saved");
    }


}
