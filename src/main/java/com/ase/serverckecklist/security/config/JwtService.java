package com.ase.serverckecklist.security.config;

import com.ase.serverckecklist.entity.Token;
import com.ase.serverckecklist.entity.User;
import com.ase.serverckecklist.repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    // DB와 상호작용하는 token repo
    private final TokenRepository tokenRepository;

    // security 설정
    private final SecurityProperties securityProperties;

    // Access Token 만료기한
    @Value("${app.security.jwt.access-token-expiration}")
    private long accessTokenExpiration;

    // Refresh Token 만료기한
    @Value("${app.security.jwt.access-token-expiration}")
    private long refreshTokenExpiration;

    // DB에 토큰 저장
    public void saveUserToken(String refreshToken, User user) {
        Token token = new Token(refreshToken, user.getEmail());
        tokenRepository.save(token);
    }

    // 토큰에서 사용자 이름 추출
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 클레임 추출
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Access 토큰 생성 - UserDetail로만 생성
    public String generateAccessToken(UserDetails userDetails) {
        return generateAccessToken(new HashMap<>(), userDetails);
    }

    // Access 토큰 생성
    public String generateAccessToken(
            Map<String, Object> extraClaims, // 토큰에 보낼 정보
            UserDetails userDetails
    ) {

        return generateToken(extraClaims, userDetails, accessTokenExpiration);
    }

    // Refresh 토큰 생성 - UserDetail로만 생성
    public String generateRefreshToken(UserDetails userDetails) {
        return generateRefreshToken(new HashMap<>(), userDetails);
    }

    // Refresh 토큰 생성
    public String generateRefreshToken(
            Map<String, Object> extraClaims, // 토큰에 보낼 정보
            UserDetails userDetails
    ) {
        return generateToken(extraClaims, userDetails, refreshTokenExpiration);
    }

    // 토큰 생성
    private String generateToken(
            Map<String, Object> extraClaims, // 토큰에 보낼 정보
            UserDetails userDetails,
            long expireTime
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims) // 클레임 추가
                .setSubject(userDetails.getUsername()) // subject 추가
                .setIssuedAt(new Date(System.currentTimeMillis())) // 토큰 발행일
                .setExpiration(new Date(System.currentTimeMillis() + expireTime)) // 만료기한
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 유효성 검사
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // 토큰 만료 확인
    public boolean isTokenExpired(String token) {
        return extraExpiration(token).before(new Date());
    }

    // 토큰에서 만료 기한 가져오기
    public Date extraExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // jwt에서 모든 클레임 추출
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // jwt 서명에 사용하는 비밀 키 생성
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(securityProperties.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
