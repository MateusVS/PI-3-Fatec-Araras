package br.com.fatecararas.projetointerdisciplinar.config;

import br.com.fatecararas.projetointerdisciplinar.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserServiceImpl usuarioService;

    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(usuarioService)
                .passwordEncoder(passwordEncoderConfig.passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers(
                            "/api/users",
                            "/api/users/login",
                            "/api/users/{idUser}",
                            "/api/users/{idUser}/superheroescustom",
                            "/api/users/{idUser}/superheroescustom/{idHero}",
                            "/api/superheroes",
                            "/api/superheroes/{id}")
                        .permitAll()
                    .anyRequest()
                        .authenticated()
                .and()
                .httpBasic();
    }
}
