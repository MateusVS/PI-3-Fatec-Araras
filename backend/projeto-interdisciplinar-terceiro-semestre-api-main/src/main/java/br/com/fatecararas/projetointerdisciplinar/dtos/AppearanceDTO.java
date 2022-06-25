package br.com.fatecararas.projetointerdisciplinar.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppearanceDTO {

    private String gender;
    private String race;
    private List<String> height;
    private List<String> weight;
    private String eyeColor;
    private String hairColor;

    public static List<AppearanceDTO> getAllAppearance(List<SuperHeroDTO> heroes) {
        return heroes
                .stream()
                .map(hero -> hero.getAppearance())
                .collect(Collectors.toList());
    }

    public static Double getAverageSecondHeight(List<AppearanceDTO> appearances) {
        return appearances
                .stream()
                .map(hero -> hero.getHeight())
                .map(height -> {
                    String firstHeight = height.get(1);
                    firstHeight = firstHeight.replace("cm", "").trim();
                    Double firstHeightDouble = Double.valueOf(firstHeight);
                    return firstHeightDouble;
                })
                .mapToDouble(d -> d)
                .average()
                .getAsDouble();
    }

    public static Double getAverageSecondWeight(List<AppearanceDTO> appearances) {
        return appearances
                .stream()
                .map(hero -> hero.getWeight())
                .map(weight -> {
                    String firstWeight = weight.get(1);
                    firstWeight = firstWeight.replace("kg", "").trim();
                    Double firstWeightDouble = Double.valueOf(firstWeight);
                    return firstWeightDouble;
                })
                .mapToDouble(d -> d)
                .average()
                .getAsDouble();
    }

}
