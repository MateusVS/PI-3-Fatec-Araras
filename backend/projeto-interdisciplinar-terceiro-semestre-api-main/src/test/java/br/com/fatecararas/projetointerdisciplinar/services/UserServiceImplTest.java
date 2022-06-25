package br.com.fatecararas.projetointerdisciplinar.services;

import br.com.fatecararas.projetointerdisciplinar.config.PasswordEncoderConfig;
import br.com.fatecararas.projetointerdisciplinar.domain.entities.UserEntity;
import br.com.fatecararas.projetointerdisciplinar.dtos.UserDTO;
import br.com.fatecararas.projetointerdisciplinar.repositories.UserRepository;
import br.com.fatecararas.projetointerdisciplinar.response.LoginResponse;
import br.com.fatecararas.projetointerdisciplinar.services.impl.UserServiceImpl;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoderConfig passwordEncoderConfig;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void save() {
        // Cenário
        UserDTO createdUserDTO = new UserDTO();
        createdUserDTO.setEmail("fulano@gmail.com");
        createdUserDTO.setName("Fulano");
        createdUserDTO.setPassword("12345678");

        UserEntity createduser = new UserEntity();
        createduser.setEmail("fulano@gmail.com");
        createduser.setName("Fulano");
        createduser.setPassword("12345678");

        when(this.userRepository.save(createduser)).thenReturn(createduser);

        // Ação
        UserEntity returneduser = this.userServiceImpl.save(createdUserDTO);

        // Validação
        assertThat(returneduser, is(equalTo(createduser)));
    }

    @Test
    void loginWithIncorrectEmail() {
        // Cenário
        String emailParam = null;
        String password = "123mudar";

        when(this.userRepository.findByEmail(emailParam)).thenReturn(Optional.empty());

        // Ação e Validação
        IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
                () -> userServiceImpl.login(emailParam, password));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("The email or password fields are incorrect.")));
    }

    @Test
    void loginWithIncorrectPassword() {
        // Cenário
        String emailParam = "cicrano@gmail.com";
        String password = "87654321";

        UserEntity createduser = new UserEntity();
        createduser.setIdUser(1L);
        createduser.setEmail("fulano@gmail.com");
        createduser.setName("Fulano");
        createduser.setPassword("$2a$10$Q/4tlp//2ZKZ5LvJhtu.vOleoY6bZOiStBkfScrgIBGbizHIJMdtC");

        when(this.passwordEncoderConfig.passwordEncoder()).thenReturn(new BCryptPasswordEncoder());
        when(this.userRepository.findByEmail(emailParam)).thenReturn(Optional.of(createduser));

        // Ação e Validação
        IllegalArgumentException returnedException = assertThrows(IllegalArgumentException.class,
                () -> userServiceImpl.login(emailParam, password));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("The email or password fields are incorrect.")));
    }

    @Test
    void login() {
        // Cenário
        String emailParam = "cicrano@gmail.com";
        String password = "12345678";

        UserEntity createduser = new UserEntity();
        createduser.setIdUser(1L);
        createduser.setEmail("fulano@gmail.com");
        createduser.setName("Fulano");
        createduser.setPassword("$2a$10$Q/4tlp//2ZKZ5LvJhtu.vOleoY6bZOiStBkfScrgIBGbizHIJMdtC");

        when(this.passwordEncoderConfig.passwordEncoder()).thenReturn(new BCryptPasswordEncoder());
        when(this.userRepository.findByEmail(emailParam)).thenReturn(Optional.of(createduser));

        // Ação
        LoginResponse loginResponse = userServiceImpl.login(emailParam, password);

        // Validação
        assertThat(loginResponse, notNullValue());
        assertThat(loginResponse.getId(), is(equalTo(createduser.getIdUser())));
    }

    @Test
    void loadUserByUsernameWithIncorrectEmail() {
        // Cenário
        String emailParam = "cicrano@gmail.com";

        when(this.userRepository.findByEmail(emailParam)).thenReturn(Optional.empty());

        // Ação e Validação
        UsernameNotFoundException returnedException = assertThrows(UsernameNotFoundException.class,
                () -> userServiceImpl.loadUserByUsername(emailParam));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("User not found in database.")));
    }

    @Test
    void loadUserByUsername() {
        // Cenário
        String emailParam = "cicrano@gmail.com";

        UserEntity createduser = new UserEntity();
        createduser.setIdUser(1L);
        createduser.setEmail("fulano@gmail.com");
        createduser.setName("Fulano");
        createduser.setPassword("$2a$10$Q/4tlp//2ZKZ5LvJhtu.vOleoY6bZOiStBkfScrgIBGbizHIJMdtC");

        UserDetails user = User.builder()
                .username(createduser.getEmail())
                .password(createduser.getPassword())
                .roles("ADMIN")
                .build();

        when(this.userRepository.findByEmail(emailParam)).thenReturn(Optional.of(createduser));

        // Ação e Validação
        UserDetails userDetails = userServiceImpl.loadUserByUsername(emailParam);

        // Validação
        assertThat(userDetails,is(equalTo(user)));
    }

}
