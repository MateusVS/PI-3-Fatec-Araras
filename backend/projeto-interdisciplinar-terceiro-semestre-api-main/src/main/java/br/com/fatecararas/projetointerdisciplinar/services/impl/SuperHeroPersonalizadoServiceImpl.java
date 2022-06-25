package br.com.fatecararas.projetointerdisciplinar.services.impl;

import br.com.fatecararas.projetointerdisciplinar.domain.entities.SuperHero;
import br.com.fatecararas.projetointerdisciplinar.domain.entities.SuperHeroCustom;
import br.com.fatecararas.projetointerdisciplinar.domain.entities.UserEntity;
import br.com.fatecararas.projetointerdisciplinar.dtos.AppearanceDTO;
import br.com.fatecararas.projetointerdisciplinar.dtos.PowerstatsDTO;
import br.com.fatecararas.projetointerdisciplinar.dtos.SuperHeroDTO;
import br.com.fatecararas.projetointerdisciplinar.dtos.SuperHeroPersonalizadoDTO;
import br.com.fatecararas.projetointerdisciplinar.repositories.SuperHeroPersonalizadoRepository;
import br.com.fatecararas.projetointerdisciplinar.repositories.UserRepository;
import br.com.fatecararas.projetointerdisciplinar.services.SuperHeroPersonalizadoService;
import br.com.fatecararas.projetointerdisciplinar.services.SuperHeroService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static br.com.fatecararas.projetointerdisciplinar.dtos.AppearanceDTO.*;
import static br.com.fatecararas.projetointerdisciplinar.dtos.PowerstatsDTO.*;

@Transactional(readOnly = true)
@Service
public class SuperHeroPersonalizadoServiceImpl implements SuperHeroPersonalizadoService {

    private SuperHeroPersonalizadoRepository repository;
    private SuperHeroService superHeroService;
    private UserRepository usuarioRepository;

    @Autowired
    public SuperHeroPersonalizadoServiceImpl(SuperHeroService superHeroService, SuperHeroPersonalizadoRepository repository,
                                             UserRepository usuarioRepository) {
        this.superHeroService = superHeroService;
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    @Override
    public SuperHero save(SuperHeroPersonalizadoDTO superHeroPersonalizadoDTO, Long idUser) {
        UserEntity foundUser = this.getUserById(idUser);
        Long firstHeroId = superHeroPersonalizadoDTO.getFirstHeroId();
        Long secondHeroId = superHeroPersonalizadoDTO.getSecondHeroId();

        List<SuperHeroDTO> heroes = getSuperHeroesCustom(firstHeroId, secondHeroId);
        PowerstatsDTO powerstats = this.getPowerstats(heroes);
        List<Double> appearancies = this.getAppearance(heroes);

        SuperHero newSuperHero = this.createNewSuperHero(superHeroPersonalizadoDTO, powerstats, appearancies, firstHeroId, secondHeroId);

        SuperHeroCustom newSuperHeroCustom = new SuperHeroCustom();
        String newSuperHeroCustomjson = new Gson().toJson(newSuperHero);
        newSuperHeroCustom.setSuperHeroCustom(newSuperHeroCustomjson);
        newSuperHeroCustom.setUser(foundUser);

        SuperHeroCustom createdSuperHeroCustom = repository.save(newSuperHeroCustom);

        SuperHero foundSuperHero = transformJsonToObject(createdSuperHeroCustom);
        return foundSuperHero;
    }

    @Override
    public SuperHero getById(Long idUser, Long idHero) {
        UserEntity foundUser = this.getUserById(idUser);
        List<SuperHeroCustom> superHeroesCustom = foundUser.getSuperHeroCustom();
        SuperHeroCustom superHeroCustomFound = this.verifyAndGetHeroIfExistsInTheFoundUser(superHeroesCustom, idHero);
        SuperHero foundSuperHero = transformJsonToObject(superHeroCustomFound);
        return foundSuperHero;
    }

    @Override
    public List<SuperHero> getAll(Long idUser) {
        UserEntity foundUser = this.getUserById(idUser);
        List<SuperHeroCustom> superHeroesCustom = foundUser.getSuperHeroCustom();
        List<SuperHero> foundSuperHeroes = this.getSuperHeroes(superHeroesCustom);
        return foundSuperHeroes;
    }

    private SuperHero transformJsonToObject(SuperHeroCustom superHeroCustomFound) {
        Gson gson = new Gson();
        SuperHero superHero = gson.fromJson(superHeroCustomFound.getSuperHeroCustom(), SuperHero.class);
        superHero.setId(superHeroCustomFound.getId());
        return superHero;
    }


    private List<SuperHeroDTO> getSuperHeroesCustom(Long firstHeroId, Long secondHeroId) {
        List<SuperHeroDTO> heroes = new ArrayList<>();
        SuperHeroDTO firstHero = this.superHeroService.getById(firstHeroId);
        SuperHeroDTO secondHero = this.superHeroService.getById(secondHeroId);
        heroes.add(firstHero);
        heroes.add(secondHero);
        return heroes;
    }

    private PowerstatsDTO getPowerstats(List<SuperHeroDTO> heroes) {
        List<PowerstatsDTO> powers = getAllPowerstats(heroes);
        Double intelligence = getAverageIntelligence(powers);
        Double strength = getAverageStrength(powers);
        Double speed = getAverageSpeed(powers);
        Double durability = getAverageDurability(powers);
        Double power = getAveragePower(powers);
        Double combat = getAverageCombat(powers);

        return PowerstatsDTO
                .builder()
                .intelligence(intelligence)
                .strength(strength)
                .speed(speed)
                .durability(durability)
                .power(power)
                .combat(combat)
                .build();
    }

    private List<Double> getAppearance(List<SuperHeroDTO> heroes) {
        List<AppearanceDTO> appearance = getAllAppearance(heroes);
        Double height = getAverageSecondHeight(appearance);
        Double weight = getAverageSecondWeight(appearance);
        List<Double> lista = new ArrayList<>(Arrays.asList(
                height,
                weight
        ));
        return lista;
    }

    private SuperHero createNewSuperHero(SuperHeroPersonalizadoDTO superHeroPersonalizadoDTO, PowerstatsDTO powerstats,
                                         List<Double> appearancies, Long firstHeroId, Long secondHeroId) {
        String fullName = superHeroPersonalizadoDTO.getFullName();
        String nickName = superHeroPersonalizadoDTO.getNickName();
        String eyeColor = superHeroPersonalizadoDTO.getEyeColor();
        String hairColor = superHeroPersonalizadoDTO.getHairColor();
        String profession = superHeroPersonalizadoDTO.getProfession();
        String firstApparition = superHeroPersonalizadoDTO.getFirstApparition();
        String publishedBy = superHeroPersonalizadoDTO.getPublishedBy();
        String image = superHeroPersonalizadoDTO.getImage();

        SuperHero newSuperHero = new SuperHero();
        newSuperHero.setFullName(fullName);
        newSuperHero.setNickName(nickName);
        newSuperHero.setEyeColor(eyeColor);
        newSuperHero.setHairColor(hairColor);
        newSuperHero.setProfession(profession);
        newSuperHero.setFirstApparition(firstApparition);
        newSuperHero.setPublishedBy(publishedBy);
        newSuperHero.setImage(image);
        newSuperHero.setFirstHeroId(firstHeroId);
        newSuperHero.setSecondHeroId(secondHeroId);
        newSuperHero.setIntelligence(powerstats.getIntelligence());
        newSuperHero.setStrength(powerstats.getStrength());
        newSuperHero.setSpeed(powerstats.getSpeed());
        newSuperHero.setDurability(powerstats.getDurability());
        newSuperHero.setPower(powerstats.getPower());
        newSuperHero.setCombat(powerstats.getCombat());
        newSuperHero.setHeight(appearancies.get(0));
        newSuperHero.setWeight(appearancies.get(1));
        return newSuperHero;
    }

    private UserEntity getUserById(Long idUser) {
        return this.usuarioRepository.findById(idUser)
                .orElseThrow(() -> new UsernameNotFoundException("User not found in database."));
    }

    private SuperHeroCustom verifyAndGetHeroIfExistsInTheFoundUser(List<SuperHeroCustom> superHeroesCustom, Long idHero) {
        return superHeroesCustom
                .stream()
                .filter(hero -> hero.getId().equals(idHero))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User not has this custom super hero."));
    }

    private List<SuperHero> getSuperHeroes(List<SuperHeroCustom> superHeroesCustom) {
        List<SuperHero> foundSuperHeroesCustom = superHeroesCustom
                .stream()
                .map(this::transformJsonToObject)
                .collect(Collectors.toList());
        return foundSuperHeroesCustom;
    }
}
