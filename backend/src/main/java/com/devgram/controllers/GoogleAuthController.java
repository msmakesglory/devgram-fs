package com.devgram.controllers;


import com.devgram.models.MyUser;
import com.devgram.repos.UserRepository;
import com.devgram.services.MyUserService;
import com.devgram.services.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/auth/google")
@RestController
public class GoogleAuthController {

    @Autowired
    MyUserService myUserService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository myUserRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    String clientSecret;

    @Value("${oauth.grant-type}")
    String grantType;

    @Value("${oauth.google.redirect-uri}")
    String redirectUri;

    @GetMapping("/callback")
    public void handleGoogleCallback(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
        // Step 1: Get access token from Google
        String access_token = (String) getAccessTokenFromGoogle(code).getBody().get("access_token");

        // Step 2: Get user info from Google
        Map data = getUserInfoFromGoogle(access_token);

        // Step 3: Save user to database
        MyUser user = myUserService.saveGoogleUser(data);

        // Step 4: Generate JWT
        String jwtToken = jwtUtils.generateToken(user.getEmail());

        // Step 5: Set JWT as HTTP-only cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(false) // set true in production with HTTPS
                .path("/")
                .maxAge(24 * 60 * 60 * 7) // 7 day
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        // Step 6: Redirect to frontend
        response.sendRedirect("http://localhost:5173/projects");
    }


    private ResponseEntity<Map> getAccessTokenFromGoogle(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", grantType);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity("https://oauth2.googleapis.com/token", request, Map.class);
        return response;
    };

    private Map<String, Object> getUserInfoFromGoogle(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map<String, Object> userInfo = response.getBody();

        // Extract only name, email, picture
        Map<String, Object> simplifiedUser = new HashMap<>();
        simplifiedUser.put("name", userInfo.get("name"));
        simplifiedUser.put("email", userInfo.get("email"));
        simplifiedUser.put("picture", userInfo.get("picture"));

        return simplifiedUser;
    }

}
