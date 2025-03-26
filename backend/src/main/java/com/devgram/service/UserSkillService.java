package com.devgram.service;

import com.devgram.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.devgram.repositories.*;

import java.util.UUID;

@Service
public class UserSkillService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    public void addUserSkill(UUID userId, UUID skillId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));

        UserSkillId userSkillId = new UserSkillId(userId, skillId);

        UserSkill userSkill = new UserSkill();
        userSkill.setId(userSkillId);
        userSkill.setUser(user);
        userSkill.setSkill(skill);

        userSkillRepository.save(userSkill);

        System.out.println("userskill created...");
    }
}
