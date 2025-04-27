package com.devgram.services;


import com.devgram.dto.response.UserResDto;
import com.devgram.models.MyUser;
import com.devgram.repos.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MyUserService implements UserDetailsService {

    private final UserRepository userRepository;
    UserRepository userRepo;
    public MyUserService(UserRepository userRepo, UserRepository userRepository) {
        this.userRepo = userRepo;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepo.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("MyUser not found"));
    }

    public MyUser saveGoogleUser(Map<String, Object> googleUserData) {
        String fullName = (String) googleUserData.get("name");
        String email = (String) googleUserData.get("email");
        String picture = (String) googleUserData.get("picture");

        // Optional: create username from email
        String userName = email.split("@")[0];

        // Check if user already exists
        Optional<MyUser> existingUserOpt = userRepository.findByEmail(email);

        if (existingUserOpt.isPresent()) {
            return existingUserOpt.get(); // already saved
        }

        MyUser newUser = new MyUser();
        newUser.setFullName(fullName);
        newUser.setUserName(userName);
        newUser.setEmail(email);
        newUser.setProfilePictureUrl(picture);
        newUser.setJoinDate(new Date());
        return userRepository.save(newUser);
    }

    public MyUser saveGithubUser(Map<String, Object> githubUserData) {
        String fullName = (String) githubUserData.get("name");
        String email = (String) githubUserData.get("email");
        String picture = (String) githubUserData.get("picture");

        // GitHub name might be null, fallback to username
        if (fullName == null || fullName.isBlank()) {
            fullName = (String) githubUserData.get("login");
        }

        // If email is null, you might want to fetch verified emails separately or handle it
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("GitHub email is not available. Make sure it's public or handle it explicitly.");
        }

        String userName = email.split("@")[0];

        Optional<MyUser> existingUserOpt = userRepository.findByEmail(email);
        if (existingUserOpt.isPresent()) {
            return existingUserOpt.get();
        }

        MyUser newUser = new MyUser();
        newUser.setFullName(fullName);
        newUser.setUserName(userName);
        newUser.setEmail(email);
        newUser.setProfilePictureUrl(picture);

        return userRepository.save(newUser);
    }

    MyUser getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("MyUser not found"));
    }

    public Optional<MyUser> getUserById(UUID userId) {
        return userRepository.findById(userId);
    }


    UserResDto convertToDto(MyUser myUser) {
        return new UserResDto(
                myUser.getId(),
                myUser.getFullName(),
                myUser.getUsername(),
                myUser.getEmail(),
                myUser.getProfilePictureUrl(),
                myUser.getBio(),
                myUser.getLocation(),
                myUser.getWebsite(),
                myUser.getJoinDate(),
                myUser.getProjectCount() == null ? 0 : myUser.getProjectCount(),
                myUser.getImpressionsCount() == null ? 0 : myUser.getImpressionsCount(),
                myUser.getGithubUrl(),
                myUser.getLinkedinUrl(),
                myUser.getSkillIds()

        );
    }
}
