package com.devgram.controllers;

import com.devgram.models.MyUser;
import com.devgram.repos.UserRepository;
import com.devgram.services.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
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

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) throws IOException {
        ResponseCookie deleteCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false) // set true in production
                .path("/")
                .maxAge(0) // delete the cookie
                .build();

        response.setHeader("Set-Cookie", deleteCookie.toString());

        return ResponseEntity.ok().build();
    }
}
