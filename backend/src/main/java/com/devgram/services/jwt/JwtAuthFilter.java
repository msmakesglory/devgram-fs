package com.devgram.services.jwt;

import com.devgram.services.MyUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final MyUserService userService;
    private final JwtUtils jwtUtils;

    public JwtAuthFilter(MyUserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else {
            // Fallback: try to get token from cookies
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if (cookie.getName().equals("jwt")) {
                        token = cookie.getValue();
                    }
                }
            }
        }

        if (token != null) {
            String username = jwtUtils.extractUsername(token);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(username);
                if (jwtUtils.isTokenValid(userDetails, token)) {
                    SecurityContext contextHolder = SecurityContextHolder.createEmptyContext();

                    UsernamePasswordAuthenticationToken upToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    upToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    contextHolder.setAuthentication(upToken);
                    SecurityContextHolder.setContext(contextHolder);
                }
            }
        }

        filterChain.doFilter(request, response);
    }

}
