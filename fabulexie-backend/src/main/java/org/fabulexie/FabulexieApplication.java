package org.fabulexie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityScheme;

@SpringBootApplication
public class FabulexieApplication {

	public static void main(String[] args) {
		SpringApplication.run(FabulexieApplication.class, args);
	}
	
	@Bean
	 public OpenAPI fabulexieOpenAPI() {
	   return new OpenAPI().components(new Components().addSecuritySchemes("authorization",
	     new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
	}

	
}
