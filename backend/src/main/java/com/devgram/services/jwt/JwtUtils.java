package com.devgram.services.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
public class JwtUtils {

    private final String SECRET_KEY;
    private final Long EXPIRATION_TIME;

    JwtUtils() {
        this.SECRET_KEY = "da235a3e58003999655e294051d862a4015fae42b93dc304f73398e30b228ca8";
        this.EXPIRATION_TIME = (long)(24*60*60*1000*7);
    }

    public String generateToken(String userName) {
        return Jwts
                .builder()
                .subject(userName)
                .signWith(key())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .compact();
    }
    public String refreshToken(HashMap<String,Object> claims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .signWith(key())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims,T> claimsTFunction) {
        return claimsTFunction.apply(
            Jwts
                    .parser()
                    .verifyWith(key())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
        );
    }

    public boolean isTokenValid(UserDetails userDetails,String token) {
        String username = extractUsername(token);
        return (
                username.equals(userDetails.getUsername()) &&
                        !isTokenExpired(token)
                );
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(
                token,
                Claims::getExpiration
        ).before(new Date());
    }

    SecretKey key(){
       byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}
