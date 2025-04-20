package com.devgram.services;


import com.devgram.models.MyUser;
import com.devgram.repos.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

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

        return userRepository.save(newUser);
    }

}
