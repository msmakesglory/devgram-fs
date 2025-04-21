package com.devgram.controllers;

import com.devgram.models.MyUser;
import com.devgram.repos.UserRepository;
import com.devgram.services.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository myUserRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<Optional<MyUser>> getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<MyUser> user =  userRepository.findByEmail(username);

        return ResponseEntity.ok(user);
    }
}
