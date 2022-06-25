package br.com.fatecararas.projetointerdisciplinar.services;

import br.com.fatecararas.projetointerdisciplinar.domain.entities.SuperHero;
import br.com.fatecararas.projetointerdisciplinar.domain.entities.SuperHeroCustom;
import br.com.fatecararas.projetointerdisciplinar.domain.entities.UserEntity;
import br.com.fatecararas.projetointerdisciplinar.dtos.*;
import br.com.fatecararas.projetointerdisciplinar.repositories.SuperHeroPersonalizadoRepository;
import br.com.fatecararas.projetointerdisciplinar.repositories.UserRepository;
import br.com.fatecararas.projetointerdisciplinar.services.impl.SuperHeroPersonalizadoServiceImpl;
import com.google.gson.Gson;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SuperHeroPersonalizadoServiceImplTest {

    @Mock
    private SuperHeroService superHeroService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SuperHeroPersonalizadoRepository repository;

    @InjectMocks
    private SuperHeroPersonalizadoServiceImpl superHeroPersonalizadoService;

    @Before
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveWithUserNotFound() {
        // Cenário
        Long idUser = 1L;

        when(this.userRepository.findById(idUser)).thenReturn(Optional.empty());

        // Ação e Validação
        UsernameNotFoundException returnedException = assertThrows(UsernameNotFoundException.class,
                () -> superHeroPersonalizadoService.save(any(), idUser));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("User not found in database.")));
    }

    @Test
    void save() {
        // Cenário
        SuperHeroPersonalizadoDTO superHeroPersonalizadoDTO = new SuperHeroPersonalizadoDTO();
        superHeroPersonalizadoDTO.setFullName("Iron Man");
        superHeroPersonalizadoDTO.setNickName("Tony Stark");
        superHeroPersonalizadoDTO.setEyeColor("Black");
        superHeroPersonalizadoDTO.setHairColor("Black");
        superHeroPersonalizadoDTO.setProfession("VASP");
        superHeroPersonalizadoDTO.setFirstApparition("SLA");
        superHeroPersonalizadoDTO.setPublishedBy("Marvel");
        superHeroPersonalizadoDTO.setImage("imagem");
        superHeroPersonalizadoDTO.setFirstHeroId(1L);
        superHeroPersonalizadoDTO.setSecondHeroId(2L);
        Long idUser = 1L;

        Long idHero = 1L;
        PowerstatsDTO powerstatsDTO = new PowerstatsDTO();
        powerstatsDTO.setIntelligence(50.0);
        powerstatsDTO.setStrength(60.0);
        powerstatsDTO.setSpeed(70.0);
        powerstatsDTO.setDurability(65.0);
        powerstatsDTO.setPower(80.0);
        powerstatsDTO.setCombat(60.0);

        AppearanceDTO appearanceDTO = new AppearanceDTO();
        appearanceDTO.setGender("Male");
        appearanceDTO.setRace("Human");
        appearanceDTO.setHeight(Arrays.asList("6'8", "203 cm"));
        appearanceDTO.setWeight(Arrays.asList("980 lb", "441 kg"));
        appearanceDTO.setEyeColor("Black");
        appearanceDTO.setHairColor("Black");
        SuperHeroDTO createdSuperHero = this.createSuperHero(powerstatsDTO, appearanceDTO, idHero);

        Long idHeroTwo = 2L;
        PowerstatsDTO powerstatsDTOTwo = new PowerstatsDTO();
        powerstatsDTOTwo.setIntelligence(80.0);
        powerstatsDTOTwo.setStrength(60.0);
        powerstatsDTOTwo.setSpeed(30.0);
        powerstatsDTOTwo.setDurability(25.0);
        powerstatsDTOTwo.setPower(65.0);
        powerstatsDTOTwo.setCombat(87.0);

        AppearanceDTO appearanceDTOTwo = new AppearanceDTO();
        appearanceDTOTwo.setGender("Male");
        appearanceDTOTwo.setRace("Human");
        appearanceDTOTwo.setHeight(Arrays.asList("6'8", "350 cm"));
        appearanceDTOTwo.setWeight(Arrays.asList("980 lb", "586 kg"));
        appearanceDTOTwo.setEyeColor("Black");
        appearanceDTOTwo.setHairColor("Black");
        SuperHeroDTO createdSuperHeroTwo = this.createSuperHero(powerstatsDTOTwo, appearanceDTOTwo, idHeroTwo);

        UserEntity userEntity = new UserEntity();
        userEntity.setIdUser(1L);

        SuperHero superHero = new SuperHero();

        SuperHeroCustom newSuperHeroCustom = new SuperHeroCustom();
        String newSuperHeroCustomjson = new Gson().toJson(superHero);
        newSuperHeroCustom.setSuperHeroCustom(newSuperHeroCustomjson);
        newSuperHeroCustom.setUser(userEntity);

        when(this.userRepository.findById(idUser)).thenReturn(Optional.of(userEntity));
        when(this.superHeroService.getById(idHero)).thenReturn(createdSuperHero);
        when(this.superHeroService.getById(idHeroTwo)).thenReturn(createdSuperHeroTwo);
        when(this.repository.save(any())).thenReturn(newSuperHeroCustom);

        // Ação
        SuperHero foundSuperHero = this.superHeroPersonalizadoService.save(superHeroPersonalizadoDTO, idUser);

        // Validação
        assertThat(foundSuperHero, notNullValue());
        assertThat(foundSuperHero, is(equalTo(superHero)));
    }

    @Test
    void getByIdWithUserNotFound() {
        // Cenário
        Long idUser = 1L;
        Long idHero = 1L;

        when(this.userRepository.findById(idUser)).thenReturn(Optional.empty());

        // Ação e Validação
        UsernameNotFoundException returnedException = assertThrows(UsernameNotFoundException.class,
                () -> superHeroPersonalizadoService.getById(idUser, idHero));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("User not found in database.")));
    }

    @Test
    void getByIdWithUserWithoutIdSuperHeroCustom() {
        // Cenário
        Long idUser = 2L;
        Long idHero = 2L;

        SuperHero superHero = new SuperHero();
        UserEntity userEntity = new UserEntity();

        SuperHeroCustom newSuperHeroCustom = new SuperHeroCustom();
        String newSuperHeroCustomjson = new Gson().toJson(superHero);
        newSuperHeroCustom.setId(3L);
        newSuperHeroCustom.setSuperHeroCustom(newSuperHeroCustomjson);
        newSuperHeroCustom.setUser(userEntity);

        userEntity.setIdUser(2L);
        userEntity.setSuperHeroCustom(Arrays.asList(newSuperHeroCustom));

        when(this.userRepository.findById(idUser)).thenReturn(Optional.of(userEntity));

        // Ação e Validação
        UsernameNotFoundException returnedException = assertThrows(UsernameNotFoundException.class,
                () -> superHeroPersonalizadoService.getById(idUser, idHero));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("User not has this custom super hero.")));
    }

    @Test
    void getById() {
        // Cenário
        Long idUser = 3L;
        Long idHero = 3L;

        SuperHero superHero = new SuperHero();
        UserEntity userEntity = new UserEntity();

        SuperHeroCustom newSuperHeroCustom = new SuperHeroCustom();
        String newSuperHeroCustomjson = new Gson().toJson(superHero);
        newSuperHeroCustom.setId(3L);
        newSuperHeroCustom.setSuperHeroCustom(newSuperHeroCustomjson);
        newSuperHeroCustom.setUser(userEntity);

        userEntity.setIdUser(3L);
        userEntity.setSuperHeroCustom(Arrays.asList(newSuperHeroCustom));

        when(this.userRepository.findById(idUser)).thenReturn(Optional.of(userEntity));

        // Ação
        SuperHero foundSuperHero = superHeroPersonalizadoService.getById(idUser, idHero);

        // Validação
        assertThat(foundSuperHero, notNullValue());
        assertThat(foundSuperHero, is(equalTo(superHero)));
    }

    @Test
    void getAlldWithUserNotFound() {
        // Cenário
        Long idUser = 4L;
        Long idHero = 4L;

        when(this.userRepository.findById(idUser)).thenReturn(Optional.empty());

        // Ação e Validação
        UsernameNotFoundException returnedException = assertThrows(UsernameNotFoundException.class,
                () -> superHeroPersonalizadoService.getAll(idUser));

        // Validação
        assertThat(returnedException.getMessage(), is(equalTo("User not found in database.")));
    }

    @Test
    void getAll() {
        // Cenário
        Long idUser = 5L;
        Long idHero = 5L;

        SuperHero superHero = new SuperHero();
        UserEntity userEntity = new UserEntity();

        SuperHeroCustom newSuperHeroCustom = new SuperHeroCustom();
        String newSuperHeroCustomjson = new Gson().toJson(superHero);
        newSuperHeroCustom.setId(5L);
        newSuperHeroCustom.setSuperHeroCustom(newSuperHeroCustomjson);
        newSuperHeroCustom.setUser(userEntity);

        userEntity.setIdUser(5L);
        userEntity.setSuperHeroCustom(Arrays.asList(newSuperHeroCustom));

        when(this.userRepository.findById(idUser)).thenReturn(Optional.of(userEntity));

        // Ação e Validação
        List<SuperHero> superHeroes =  superHeroPersonalizadoService.getAll(idUser);

        // Validação
        assertThat(superHeroes.get(0), notNullValue());
        assertThat(superHeroes.get(0), is(equalTo(superHero)));
    }

    private SuperHeroDTO createSuperHero(PowerstatsDTO powerstatsDTO, AppearanceDTO appearanceDTO, Long idHero) {
        BiographyDTO biographyDTO = new BiographyDTO();
        biographyDTO.setFullName("Bruce Wayne");
        biographyDTO.setAlterEgos("Sla");
        biographyDTO.setAliases(Arrays.asList("teste"));
        biographyDTO.setPlaceOfBirth("sla");
        biographyDTO.setFirstAppearance("SLA");
        biographyDTO.setPublisher("Marvel");
        biographyDTO.setAlignment("sla");

        SuperHeroDTO superHeroDTO = new SuperHeroDTO();
        superHeroDTO.setId(idHero);
        superHeroDTO.setName("Batman");
        superHeroDTO.setPowerstats(powerstatsDTO);
        superHeroDTO.setAppearance(appearanceDTO);
        superHeroDTO.setBiography(biographyDTO);
        superHeroDTO.setWork(null);
        superHeroDTO.setConnections(null);
        superHeroDTO.setImages(null);
        return superHeroDTO;
    }


}
