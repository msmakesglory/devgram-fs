package com.devgram.service;

import com.devgram.models.User;
import com.devgram.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void createUser(String email, String profilePictureUrl, String fullName, String username) {
        User user = new User();
        user.setEmail(email);
        user.setProfilePictureUrl(profilePictureUrl);
        user.setFullName(fullName);
        user.setUsername(username);

        userRepository.save(user);

        System.out.println("new user added...");
    }
}
