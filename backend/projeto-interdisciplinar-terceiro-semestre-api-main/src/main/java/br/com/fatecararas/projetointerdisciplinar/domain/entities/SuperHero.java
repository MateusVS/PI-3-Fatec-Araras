package br.com.fatecararas.projetointerdisciplinar.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuperHero {

    private Long id;

    private String fullName;

    private String nickName;

    private String eyeColor;

    private String hairColor;

    private String profession;

    private String firstApparition;

    private String publishedBy;

    private String image;

    private Long firstHeroId;

    private Long secondHeroId;

    private Double intelligence;

    private Double strength;

    private Double speed;

    private Double durability;

    private Double power;

    private Double combat;

    private Double height;

    private Double weight;
}
