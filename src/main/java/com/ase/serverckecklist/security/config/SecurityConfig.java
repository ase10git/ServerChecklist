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

    // Role and Authorities
    private static final String[] PUBLIC_ROLES = {Role.USER.name(), Role.ADMIN.name()};
    private static final String[] USER_ROLES = {Role.USER.name(), Role.SERVER_USER.name(), Role.SERVER_ADMIN.name()};
    private static final String[] SERVER_ROLES = {Role.SERVER_USER.name(), Role.SERVER_ADMIN.name(), Role.ADMIN.name()};
    private static final String[] ADMIN_ROLES = {Role.ADMIN.name(), Role.SERVER_ADMIN.name()};

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
                        // public
                        .requestMatchers("/api/auth/register", "/api/auth/login", "/api/user/current-user").permitAll()

                        // user
                        .requestMatchers(HttpMethod.GET, "/api/user/{email}").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/user/**", "/api/user/new-password/**").hasAnyRole(PUBLIC_ROLES)
                        .requestMatchers(HttpMethod.PATCH, "/api/user/**", "/api/user/new-password/**").hasAnyAuthority(Permission.USER_UPDATE.name(), Permission.ADMIN_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/user/{email}").hasAnyRole(PUBLIC_ROLES)
                        .requestMatchers(HttpMethod.DELETE, "/api/user/{email}").hasAnyAuthority(Permission.USER_UPDATE.name(), Permission.ADMIN_UPDATE.name())

                        // favorites
                        .requestMatchers("/api/favorites/**").hasAnyRole(USER_ROLES)

                        // server
                        .requestMatchers(HttpMethod.POST, "/api/servers").hasAnyRole(USER_ROLES)
                        .requestMatchers(HttpMethod.PATCH, "/api/servers/{id}").hasAnyRole(ADMIN_ROLES)
                        .requestMatchers(HttpMethod.DELETE, "/api/servers/{id}").hasAnyRole(ADMIN_ROLES)
                        .requestMatchers(HttpMethod.POST, "/api/servers").hasAuthority(Permission.USER_CREATE.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/servers/{id}").hasAnyAuthority(Permission.SERVERADMIN_UPDATE.name(), Permission.ADMIN_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/servers/{id}").hasAnyAuthority(Permission.SERVERADMIN_DELETE.name(), Permission.ADMIN_DELETE.name())

                        // memo
                        .requestMatchers("/api/memo/**").hasAnyRole(SERVER_ROLES)
                        .requestMatchers(HttpMethod.GET, "/api/memo/list/{serverId}", "/api/memo/recentlist/{serverId}", "/api/memo/{id}").hasAnyAuthority(Permission.SERVERUSER_READ.name(), Permission.SERVERADMIN_READ.name(), Permission.ADMIN_READ.name())
                        .requestMatchers(HttpMethod.POST, "/api/memo").hasAnyAuthority(Permission.SERVERUSER_CREATE.name(), Permission.SERVERADMIN_CREATE.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/memo/{id}").hasAnyAuthority(Permission.SERVERUSER_UPDATE.name(), Permission.SERVERADMIN_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/memo/{id}").hasAnyAuthority(Permission.SERVERUSER_DELETE.name(), Permission.SERVERADMIN_DELETE.name())


                        // checklists
                        .requestMatchers("/api/checklists/**").hasAnyRole(SERVER_ROLES)
                        .requestMatchers(HttpMethod.GET, "/api/checklists/list/{serverId}", "/api/checklists/recentlist/{serverId}", "/api/checklists/{id}").hasAnyAuthority(Permission.SERVERUSER_READ.name(), Permission.SERVERADMIN_READ.name(), Permission.ADMIN_READ.name())
                        .requestMatchers(HttpMethod.POST, "/api/checklists").hasAnyAuthority(Permission.SERVERUSER_CREATE.name(), Permission.SERVERADMIN_CREATE.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/checklists/{id}", "/api/checklists/checkboxs").hasAnyAuthority(Permission.SERVERUSER_UPDATE.name(), Permission.SERVERADMIN_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/checklists/{id}").hasAnyAuthority(Permission.SERVERUSER_DELETE.name(), Permission.SERVERADMIN_DELETE.name())

                        // map
                        .requestMatchers("/api/maps/**").hasAnyRole(SERVER_ROLES)
                        .requestMatchers(HttpMethod.GET, "/api/maps/list/{serverId}", "/api/maps/recentlist/{serverId}", "/api/maps/{id}").hasAnyAuthority(Permission.SERVERUSER_READ.name(), Permission.SERVERADMIN_READ.name(), Permission.ADMIN_READ.name())
                        .requestMatchers(HttpMethod.POST, "/api/maps").hasAnyAuthority(Permission.SERVERUSER_CREATE.name(), Permission.SERVERADMIN_CREATE.name())
                        .requestMatchers(HttpMethod.PATCH, "/api/maps/{id}").hasAnyAuthority(Permission.SERVERUSER_UPDATE.name(), Permission.SERVERADMIN_UPDATE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/maps/{id}").hasAnyAuthority(Permission.SERVERUSER_DELETE.name(), Permission.SERVERADMIN_DELETE.name())

                        // file
                        .requestMatchers("/api/file/maps/**").hasAnyRole(SERVER_ROLES)
                        .requestMatchers(HttpMethod.GET, "/api/file/maps/**").hasAnyAuthority(Permission.SERVERUSER_READ.name(), Permission.SERVERADMIN_READ.name(), Permission.ADMIN_READ.name())

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
