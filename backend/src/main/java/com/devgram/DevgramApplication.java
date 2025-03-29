package com.devgram;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class DevgramApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevgramApplication.class, args);

	}
}
