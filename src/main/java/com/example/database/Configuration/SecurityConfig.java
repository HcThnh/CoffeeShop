package com.example.database.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.example.database.jwt.AuthEntryPointJwt;
import com.example.database.jwt.AuthTokenFilter;

import static org.springframework.security.config.Customizer.withDefaults;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity //use to specify role access
public class SecurityConfig {
    @Autowired
    DataSource dataSource;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;
    @Autowired
    private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }


    @Bean
    SecurityFilterChain MySecurityFilterChain(HttpSecurity http) throws Exception{
        http.cors(withDefaults()).authorizeHttpRequests(authorizeRequests ->
        authorizeRequests
                        .requestMatchers("/public/**", "/error").permitAll()
                        .anyRequest().authenticated()
        );
        // .logout((logout) ->
        //          logout.deleteCookies("remove")
        //              .invalidateHttpSession(true)
        //              .logoutUrl("/logout")
        //              .logoutSuccessUrl("/logout-success")
                // );
        // http.sessionManagement(
        //         session ->
        //                 session.sessionCreationPolicy(
        //                         SessionCreationPolicy.STATELESS)
        // );
        // http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
        // http.formLogin(formLogin -> 
        //         formLogin.loginProcessingUrl("/public/signin") // Endpoint nhận yêu cầu đăng nhập từ React
        //         .successHandler(customAuthenticationSuccessHandler) // Gắn success handler
        //         .permitAll()
        // );
        http.httpBasic(withDefaults());
        http.headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions
                        .sameOrigin()
                )
        );
        http.csrf(csrf -> csrf.disable());
        http.addFilterBefore(authenticationJwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
        return new JdbcUserDetailsManager(dataSource);
    }

    
    @Bean
    public PasswordEncoder passwordEncoder(){
        //return new BCryptPasswordEncoder();
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
