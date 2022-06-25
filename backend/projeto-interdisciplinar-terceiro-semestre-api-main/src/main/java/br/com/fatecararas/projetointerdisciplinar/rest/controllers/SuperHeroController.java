package br.com.fatecararas.projetointerdisciplinar.rest.controllers;

import br.com.fatecararas.projetointerdisciplinar.dtos.SuperHeroDTO;
import br.com.fatecararas.projetointerdisciplinar.services.SuperHeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/superheroes")
public class SuperHeroController {

    private SuperHeroService superHeroService;

    @Autowired
    public SuperHeroController(SuperHeroService superHeroService) {
        this.superHeroService = superHeroService;
    }

    @GetMapping
    public List<SuperHeroDTO> getAll() {
        return this.superHeroService.getAll();
    }

    @GetMapping("/{id}")
    public SuperHeroDTO getById(@PathVariable Long id) {
        return this.superHeroService.getById(id);
    }
}
