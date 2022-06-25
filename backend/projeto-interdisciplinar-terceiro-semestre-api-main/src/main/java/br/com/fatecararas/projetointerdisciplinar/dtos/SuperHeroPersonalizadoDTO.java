package br.com.fatecararas.projetointerdisciplinar.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuperHeroPersonalizadoDTO {

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
}
