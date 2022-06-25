package br.com.fatecararas.projetointerdisciplinar.services;

import br.com.fatecararas.projetointerdisciplinar.domain.entities.SuperHero;
import br.com.fatecararas.projetointerdisciplinar.dtos.SuperHeroPersonalizadoDTO;

import java.util.List;

public interface SuperHeroPersonalizadoService {

    SuperHero save(SuperHeroPersonalizadoDTO superHeroPersonalizadoDTO, Long idUser);

    SuperHero getById(Long idUser, Long idHero);

    List<SuperHero> getAll(Long idUser);
}
