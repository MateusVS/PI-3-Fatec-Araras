package br.com.fatecararas.projetointerdisciplinar.dtos;

import lombok.Data;

@Data
public class SuperHeroDTO {

    private Long id;
    private String name;
    private PowerstatsDTO powerstats;
    private AppearanceDTO appearance;
    private BiographyDTO biography;
    private WorkDTO work;
    private ConnectionsDTO connections;
    private ImagesDTO images;
}
