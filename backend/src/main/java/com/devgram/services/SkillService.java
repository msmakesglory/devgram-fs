package com.devgram.services;

import com.devgram.models.Skill;
import com.devgram.repos.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillService {

    @Autowired
    SkillRepository skillRepository;

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> addSkills(List<Skill> skills) {
        try{
            return skillRepository.saveAll(skills);
        }catch (Exception e){
            return new ArrayList<>();
        }
    }

    public Skill addSkill(String skillName) {
        try {
            return skillRepository.save(new Skill(null, skillName));
        } catch (Exception e) {
            return skillRepository.findBySkillName(skillName).get();
        }
    }
}
