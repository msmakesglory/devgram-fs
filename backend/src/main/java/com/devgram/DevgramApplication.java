package com.devgram;

import com.devgram.repository.UserRepository;
import com.devgram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevgramApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(DevgramApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception{
		userService.addUser(
				"varma@123.com",
				"https://profilepic.jpg",
				"Santosh Varma Addala",
				"Varma@21"
		);

		System.out.println("User added Successfully");
	}

}
