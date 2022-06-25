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
public class PowerstatsDTO {

    private Double intelligence;
    private Double strength;
    private Double speed;
    private Double durability;
    private Double power;
    private Double combat;

    public static List<PowerstatsDTO> getAllPowerstats(List<SuperHeroDTO> heroes) {
        return heroes
                .stream()
                .map(hero -> hero.getPowerstats())
                .collect(Collectors.toList());
    }

    public static Double getAverageIntelligence(List<PowerstatsDTO> powers) {
        return powers
                .stream()
                .map(power -> power.getIntelligence())
                .mapToDouble(intelligence -> intelligence)
                .average()
                .getAsDouble();
    }

    public static Double getAverageStrength(List<PowerstatsDTO> powers) {
        return powers
                .stream()
                .map(power -> power.getStrength())
                .mapToDouble(strength -> strength)
                .average()
                .getAsDouble();
    }

    public static Double getAverageSpeed(List<PowerstatsDTO> powers) {
        return powers
                .stream()
                .map(power -> power.getSpeed())
                .mapToDouble(speed -> speed)
                .average()
                .getAsDouble();
    }

    public static Double getAverageDurability(List<PowerstatsDTO> powers) {
        return powers
                .stream()
                .map(power -> power.getDurability())
                .mapToDouble(durability -> durability)
                .average()
                .getAsDouble();
    }

    public static Double getAveragePower(List<PowerstatsDTO> powers) {
        return powers
                .stream()
                .map(power -> power.getPower())
                .mapToDouble(power -> power)
                .average()
                .getAsDouble();
    }

    public static Double getAverageCombat(List<PowerstatsDTO> powers) {
        return powers
                .stream()
                .map(power -> power.getCombat())
                .mapToDouble(combat -> combat)
                .average()
                .getAsDouble();
    }
}
