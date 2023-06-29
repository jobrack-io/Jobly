package com.jobly.api.users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class JoblyApiUsersApplication {

	public static void main(String[] args) {
		SpringApplication.run(JoblyApiUsersApplication.class, args);
	}
	
	/*@Bean
	/public BCryptPasswordEncoder bCryptPasswordEncoder()
	{
		return new BCryptPasswordEncoder();
	}*/


}
