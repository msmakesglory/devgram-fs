package com.devgram.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class SecureController {

    @GetMapping("/info")
    public Map<String, Object> info(@AuthenticationPrincipal OAuth2User oauth2User, OAuth2AuthenticationToken authentication) {

        System.out.println(oauth2User);
        System.out.println(authentication);

        return oauth2User.getAttributes();
    }
}
