package com.devgram.controllers;

import com.devgram.dto.request.UserReqDto;
import com.devgram.services.MyUserService;
import com.devgram.models.MyUser;
import com.devgram.repos.UserRepository;
import com.devgram.services.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository myUserRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MyUserService userService;

    @GetMapping("/me")
    public ResponseEntity<Optional<MyUser>> getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<MyUser> user =  userRepository.findByEmail(username);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getInspectedUser(@PathVariable UUID userId) {
         Optional<MyUser> user = userService.getUserById(userId);

         if (user.isPresent()) {
             return ResponseEntity.ok(user);
         }
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @PostMapping("/{userId}")
    public ResponseEntity<MyUser> setProfileDetails(@PathVariable UUID userId, @RequestBody UserReqDto request) {
        MyUser updatedUser = userService.setUserDetails(userId, request);

        return ResponseEntity.ok(updatedUser);
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
