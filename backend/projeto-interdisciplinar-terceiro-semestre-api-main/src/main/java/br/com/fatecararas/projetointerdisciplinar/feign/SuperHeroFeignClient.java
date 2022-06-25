package br.com.fatecararas.projetointerdisciplinar.feign;

import br.com.fatecararas.projetointerdisciplinar.dtos.SuperHeroDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@CrossOrigin
@FeignClient(url= "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api" , name = "superHero")
public interface SuperHeroFeignClient {

    @GetMapping(value = "/all.json", consumes = MediaType.APPLICATION_JSON_VALUE)
    List<SuperHeroDTO> getAll();
}
