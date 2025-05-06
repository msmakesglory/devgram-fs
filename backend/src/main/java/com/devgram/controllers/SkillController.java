package com.devgram.controllers;

import com.devgram.models.Skill;
import com.devgram.services.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills() {
        List<Skill> skills = skillService.getSkills();

        if (skills.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(skills);
    }

    @PostMapping
    public ResponseEntity<List<Skill>> addSkill(@RequestBody List<Skill> skillsList) {
        List<Skill> skills = skillService.addSkills(skillsList);

        if (skills.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(skills);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable long id) {
        boolean success = skillService.deleteSkill(id);
        if (success) return ResponseEntity.ok("Skill deleted SuccessFully");
        return ResponseEntity.badRequest().body("Failed to delete skill");
    }

}