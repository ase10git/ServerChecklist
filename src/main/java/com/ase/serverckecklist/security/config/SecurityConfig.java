package com.ase.serverckecklist.security.config;

import com.ase.serverckecklist.security.auth.handler.CustomLogoutHandler;
import com.ase.serverckecklist.security.auth.handler.CustomLogoutSuccessHandler;
import com.ase.serverckecklist.security.filter.JwtAuthenticationFilter;
import com.ase.serverckecklist.user.entity.Permission;
import com.ase.serverckecklist.user.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    // filter
    private final JwtAuthenticationFilter jwtAuthFilter;
    // authentication provider
    private final AuthenticationProvider authenticationProvider;
    // logout handler
    private final CustomLogoutHandler customLogoutHandler;
    // logout success handler
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    // 가시성을 위한 static 처리
    private static final Role USER = Role.USER;
    private static final Role ADMIN = Role.ADMIN;
    private static final Role SERVER_USER = Role.SERVER_USER;
    private static final Role SERVER_ADMIN = Role.SERVER_ADMIN;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        // ClearSiteDataHeader를 작성하는 LogoutHandler 생성
        HeaderWriterLogoutHandler clearSiteData =
                new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(ClearSiteDataHeaderWriter.Directive.ALL));

        http
                // session stateless로 인해 꺼 둠
                .csrf(auth->auth.disable())
                // form 로그인 끄기 - jwt 사용
                .formLogin(form->form.disable());

        http
                .authorizeHttpRequests((authorize)->authorize
                        // auth
                        .requestMatchers("/api/auth/refresh-token").hasAnyRole(USER.name(), ADMIN.name())
                        .requestMatchers(HttpMethod.GET,"/api/auth/refresh-token").hasAnyAuthority(
                                Permission.USER_READ.name(), Permission.ADMIN_READ.name()
                        )

                        // user
                        .requestMatchers("/api/user/**").hasAnyRole(USER.name(), ADMIN.name())

                        // favorites
                        .requestMatchers("/api/favorites/**").hasAnyRole(USER.name())

                        // server
                        .requestMatchers("/api/servers/**").hasAnyRole(USER.name(), SERVER_USER.name(), SERVER_ADMIN.name(), ADMIN.name())

                        // memo
                        .requestMatchers("/api/memo/**").hasAnyRole(SERVER_USER.name(), SERVER_ADMIN.name(), ADMIN.name())

                        // checklists
                        .requestMatchers("/api/checklists/**").hasAnyRole(SERVER_USER.name(), SERVER_ADMIN.name(), ADMIN.name())

                        // map
                        .requestMatchers("/api/maps/**").hasAnyRole(SERVER_USER.name(), SERVER_ADMIN.name(), ADMIN.name())

                        // file
                        .requestMatchers("/api/file/**").hasAnyRole(USER.name(), SERVER_USER.name(), SERVER_ADMIN.name(), ADMIN.name())

                        .anyRequest() // 그 외의 모든 요청은
                        .permitAll() // 허용
                );

        http
                .sessionManagement(session->
                    session // session state는 저장되면 안되므로 stateless로 설정
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class); // jwt 필터 가동

        // cors 설정
        http
                .cors(corsConfigurer->
                        corsConfigurer.configurationSource(corsConfigurationSource()));

        // 로그아웃 설정
        http
                .logout(logout->logout
                        .logoutUrl("/api/auth/logout")
                        .addLogoutHandler(customLogoutHandler)
                        .addLogoutHandler(clearSiteData)
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                );

        return http.build();
    }

    // CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // React client Origin을 허용
        corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        // React client로부터 오는 모든 메소드 허용
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        // React client로부터 오는 credential(cookie) 허용
        corsConfiguration.setAllowCredentials(true);
        // React client로부터 오는 모든 헤더를 허용
        corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
        corsConfiguration.setMaxAge(3600L);
        // 클라이언트에 노출될 Authorization 헤더 설정
        corsConfiguration.setExposedHeaders(Collections.singletonList("Authorization"));

        // cors 설정을 URL에 매핑
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 경로에 대해 CORS 설정 적용
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
