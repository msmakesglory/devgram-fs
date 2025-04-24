package com.devgram.services;

import com.devgram.models.Skill;
import com.devgram.repos.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    SkillRepository skillRepository;

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> addSkills(List<Skill> skills) {
        return skillRepository.saveAll(skills);
    }

    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }
}
