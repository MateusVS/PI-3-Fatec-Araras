package br.com.fatecararas.projetointerdisciplinar.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class UserEntity {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "id_User")
    private Long idUser;

    @NotEmpty
    @NotNull
    @Column(length = 50,nullable = false)
    private String name;

    @NotEmpty
    @NotNull
    @Email
    @Column(length = 80,nullable = false, unique = true)
    private String email;

    @NotEmpty
    @NotNull
    @Size(min = 8, message = "Password must contain at least {min} characters.")
    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<SuperHeroCustom> superHeroCustom;
}


































