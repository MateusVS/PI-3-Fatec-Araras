package br.com.fatecararas.projetointerdisciplinar.repositories;

import br.com.fatecararas.projetointerdisciplinar.domain.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByPassword(String password);

    Boolean existsByEmail(String email);

    Optional<UserEntity> findById(Long idUser);
}
