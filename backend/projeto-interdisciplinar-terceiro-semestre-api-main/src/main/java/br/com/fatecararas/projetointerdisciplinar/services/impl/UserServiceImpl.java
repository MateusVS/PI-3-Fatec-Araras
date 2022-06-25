package br.com.fatecararas.projetointerdisciplinar.services.impl;

import br.com.fatecararas.projetointerdisciplinar.config.PasswordEncoderConfig;
import br.com.fatecararas.projetointerdisciplinar.domain.entities.UserEntity;
import br.com.fatecararas.projetointerdisciplinar.dtos.UserDTO;
import br.com.fatecararas.projetointerdisciplinar.repositories.UserRepository;
import br.com.fatecararas.projetointerdisciplinar.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Service
public class UserServiceImpl implements UserDetailsService {

    private UserRepository usuarioRepository;
    private PasswordEncoderConfig passwordEncoderConfig;

    @Autowired
    public UserServiceImpl(UserRepository usuarioRepository, PasswordEncoderConfig passwordEncoderConfig) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoderConfig = passwordEncoderConfig;
    }

    @Transactional
    public UserEntity save(UserDTO usuarioDTO) {
        UserEntity usuario = new UserEntity();
        usuario.setName(usuarioDTO.getName());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setPassword(usuarioDTO.getPassword());
        return usuarioRepository.save(usuario);
    }

    public LoginResponse login(String email, String password) {
        UserEntity foundUser = usuarioRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("The email or password fields are incorrect."));
        String userPasswordFound = foundUser.getPassword();
        Long userId = foundUser.getIdUser();
        this.validPassword(password, userPasswordFound);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(userId);
        return loginResponse;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var foundUser = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found in database."));

        return User
                .builder()
                .username(foundUser.getEmail())
                .password(foundUser.getPassword())
                .roles("ADMIN")
                .build();
    }

    private void validPassword(String password, String userPasswordFound) {
        if(!this.passwordEncoderConfig.passwordEncoder().matches(password, userPasswordFound)) {
            throw new IllegalArgumentException("The email or password fields are incorrect.");
        }
    }
}



































