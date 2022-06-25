package br.com.fatecararas.projetointerdisciplinar.dtos;

import lombok.Data;

import java.util.List;

@Data
public class BiographyDTO {

    private String fullName;
    private String alterEgos;
    private List<String> aliases;
    private String placeOfBirth;
    private String firstAppearance;
    private String publisher;
    private String alignment;
}
