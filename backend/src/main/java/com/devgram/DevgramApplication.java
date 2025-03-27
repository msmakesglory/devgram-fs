package com.devgram;

import com.devgram.service.*;
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

	@Autowired
	private UserSkillService userSkillService;

	@Autowired
	private PostService postService;

	@Autowired
	private PostSkillService postSkillService;

	public static void main(String[] args) {
		SpringApplication.run(DevgramApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		UUID userId = UUID.fromString("43eb9f2f-d5ea-4612-8f2f-b1397b342ccc");
		UUID skillId = UUID.fromString("c4a5933c-06df-488e-a36c-cdf52f51f5d1");
		UUID postId = UUID.fromString("b6bc06bf-44c6-4f02-a5f0-8e78844cbac6");

		userService.createUser("Varma@6523452.mail", "http://gwgfei.jpg", "varmavarma", "varma_varma");

	}

}
