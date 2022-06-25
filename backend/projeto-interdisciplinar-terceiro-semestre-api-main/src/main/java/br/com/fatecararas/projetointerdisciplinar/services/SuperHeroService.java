package br.com.fatecararas.projetointerdisciplinar.services;

import br.com.fatecararas.projetointerdisciplinar.dtos.SuperHeroDTO;
import br.com.fatecararas.projetointerdisciplinar.exception.NotFoundException;
import br.com.fatecararas.projetointerdisciplinar.feign.SuperHeroFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperHeroService {

    private SuperHeroFeignClient feign;
    private List<SuperHeroDTO> allSuperHeroes;

    @Autowired
    public SuperHeroService(SuperHeroFeignClient feign) {
        this.feign = feign;
    }

    public List<SuperHeroDTO> getAll() {
        List<SuperHeroDTO> superHeroes = this.feign.getAll();
        this.allSuperHeroes = superHeroes;
        return superHeroes;
    }

    public SuperHeroDTO getById(Long id) {
        var superHeroes = this.allSuperHeroes == null ? this.getAll() : this.allSuperHeroes;
        var superHeroFound = this.getSuperHeroById(superHeroes, id);
        return superHeroFound;
    }

    private SuperHeroDTO getSuperHeroById(List<SuperHeroDTO> superHeroes, Long id) {
        return superHeroes
                .stream()
                .filter(hero -> hero.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("SuperHero not found."));
    }
}
