package br.com.fatecararas.projetointerdisciplinar.repositories;

import br.com.fatecararas.projetointerdisciplinar.domain.entities.SuperHeroCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperHeroPersonalizadoRepository extends JpaRepository<SuperHeroCustom, Long> {
}
