package com.devgram.services;

import com.devgram.models.Skill;
import com.devgram.models.User;
import com.devgram.repositories.SkillRepository;
import com.devgram.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    public void createUser(String email, String profilePictureUrl, String fullName, String userName) {
        User user = new User(fullName, userName, email, profilePictureUrl);
        userRepository.save(user);

        System.out.println("new user added...");
    }

    @Transactional
    public void addUserSkill(UUID userId, long skillId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        user.getSkills().add(skill);
        userRepository.save(user);

        System.out.println("New Skill added for: " + user.getUserName());
    }
}
