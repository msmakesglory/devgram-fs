package com.devgram.services;

import com.devgram.models.Skill;
import com.devgram.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public void addSkill(String skillName) {
        Skill skill = new Skill(skillName);

        skillRepository.save(skill);

        System.out.println("new skill added....");
    }
}
