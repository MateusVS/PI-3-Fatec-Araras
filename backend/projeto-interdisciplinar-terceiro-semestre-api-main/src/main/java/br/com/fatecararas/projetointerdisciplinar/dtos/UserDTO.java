package br.com.fatecararas.projetointerdisciplinar.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    @NotEmpty
    @NotNull
    private String name;

    @NotEmpty
    @NotNull
    @Email
    private String email;

    @NotEmpty
    @NotNull
    @Size(min = 8, message = "A senha deve conter no minímo {min} caracteres")
    private String password;

    @NotEmpty
    @NotNull
    @Size(min = 8, message = "A senha deve conter no minímo {min} caracteres")
    private String repeatPassword;
}
