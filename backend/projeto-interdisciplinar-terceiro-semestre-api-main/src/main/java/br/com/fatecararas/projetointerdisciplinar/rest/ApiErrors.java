package br.com.fatecararas.projetointerdisciplinar.rest;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public class ApiErrors {

    @Getter
    private List<String> errors;

    public ApiErrors(List<String> errors) {
        this.errors = errors;
    }

    public ApiErrors(String errors) {
        this.errors = Arrays.asList(errors);
    }
}
