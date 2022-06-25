package br.com.fatecararas.projetointerdisciplinar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ProjetoInterdisciplinarApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetoInterdisciplinarApplication.class, args);
	}

}
