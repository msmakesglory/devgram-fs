package com.devgram;

import com.devgram.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class DevgramApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private SkillService skillService;

	@Autowired
	private PostService postService;


	public static void main(String[] args) {
		SpringApplication.run(DevgramApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		UUID userId = UUID.fromString("4a0eb72a-ea7b-4968-a736-93f86dc8bf12");
		UUID userId2 = UUID.fromString("02af50c1-23ea-438b-99f8-b61f39fb2e50");
		long skillId = 1;
		UUID postId = UUID.fromString("b3c5f354-dac7-4a6a-a59e-814f1b854121");




//		userService.createUser(
//				"Manoj@2166.com",
//				"https//:Manoj.jpg",
//				"Manoj Rayi",
//				"Manoj2166"
//		);

//		skillService.addSkill(
//				"Java"
//		);
//
//		userService.addUserSkill(userId, skillId);

//		postService.createPost(
//				userId,
//				"DevGram",
//				"A Collaborative Platform for Developers"
//		);

//		List<Long> skillIds = List.of(1L);
//		postService.addSkillsToPost(postId, skillIds);

//		List<UUID> userIds = List.of(userId, userId2);
//		postService.addCollaborators(postId, userIds);
	}

}
