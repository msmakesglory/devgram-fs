package com.devgram;

import com.devgram.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.UUID;

@SpringBootApplication
public class DevgramApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private SkillService skillService;


	public static void main(String[] args) {
		SpringApplication.run(DevgramApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		UUID userId = UUID.fromString("4a0eb72a-ea7b-4968-a736-93f86dc8bf12");
		long skillId = 1;
		UUID postId = UUID.fromString("b6bc06bf-44c6-4f02-a5f0-8e78844cbac6");
		UUID ownerId = UUID.fromString("43eb9f2f-d5ea-4612-8f2f-b1397b342ccc");
		UUID collaboratorId = UUID.fromString("e086f54f-02ad-41d8-8994-219ce4f3015b");


//		userService.createUser(
//				"Varma@2166.com",
//				"https//:varma.jpg",
//				"Santosh Varma Addala",
//				"Varma2166"
//		);

//		skillService.addSkill(
//				"Java"
//		);

		userService.addUserSkill(userId, skillId);

	}

}
