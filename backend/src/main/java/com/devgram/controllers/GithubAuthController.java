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
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/auth/github")
@RestController
public class GithubAuthController {

    @Autowired
    MyUserService myUserService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository myUserRepository;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    String clientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    String clientSecret;

    @Value("${oauth.github.redirect-uri}")
    String redirectUri;

    @GetMapping("/callback")
    public void handleGithubCallback(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
        // Step 1: Get access token
        String accessToken = getAccessTokenFromGithub(code);

        // Step 2: Get user info
        Map<String, Object> userData = getUserInfoFromGithub(accessToken);

        // Step 3: Save user
        MyUser user = myUserService.saveGithubUser(userData);

        // Step 4: Generate JWT
        String jwtToken = jwtUtils.generateToken(user.getEmail());

        // Step 5: Set cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(24 * 60 * 60 * 7)
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        // Step 6: Redirect to frontend
        response.sendRedirect("http://localhost:5173/user");
    }

    private String getAccessTokenFromGithub(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", code);
        params.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://github.com/login/oauth/access_token",
                request,
                Map.class
        );

        return (String) response.getBody().get("access_token");
    }

    private Map<String, Object> getUserInfoFromGithub(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.github.com/user",
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map<String, Object> githubUser = response.getBody();

        // Extract only login (username), email (might be null), avatar_url
        Map<String, Object> simplifiedUser = new HashMap<>();
        simplifiedUser.put("name", githubUser.get("name") != null ? githubUser.get("name") : githubUser.get("login"));
        simplifiedUser.put("email", getUserEmailFromGithub(accessToken)); // Might be null if private
        simplifiedUser.put("picture", githubUser.get("avatar_url"));

        return simplifiedUser;
    }
    /**
     * Retrieves the user's email address from GitHub using their access token.
     * Note: This will only work if the user has granted email scope and has made their email public,
     * or if you request the 'user:email' scope when setting up your OAuth flow.
     *
     * @param accessToken The GitHub access token obtained during OAuth
     * @return The user's primary email address or null if unavailable
     */
    private String getUserEmailFromGithub(String accessToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Set up headers with the access token
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // First try to get email from user profile
            ResponseEntity<Map> userResponse = restTemplate.exchange(
                    "https://api.github.com/user",
                    HttpMethod.GET,
                    entity,
                    Map.class
            );

            Map<String, Object> userData = userResponse.getBody();
            String email = (String) userData.get("email");

            // If email is null in the user profile, try the emails endpoint
            if (email == null || email.isEmpty()) {
                ResponseEntity<List> emailsResponse = restTemplate.exchange(
                        "https://api.github.com/user/emails",
                        HttpMethod.GET,
                        entity,
                        List.class
                );

                List<Map<String, Object>> emails = emailsResponse.getBody();
                if (emails != null && !emails.isEmpty()) {
                    // Look for primary email first
                    for (Map<String, Object> emailData : emails) {
                        if (Boolean.TRUE.equals(emailData.get("primary"))) {
                            return (String) emailData.get("email");
                        }
                    }

                    // If no primary email found, just return the first one
                    if (!emails.isEmpty()) {
                        return (String) ((Map<String, Object>) emails.get(0)).get("email");
                    }
                }
            }

            return email;
        } catch (Exception e) {
            System.err.println("Error fetching GitHub user email: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

}
