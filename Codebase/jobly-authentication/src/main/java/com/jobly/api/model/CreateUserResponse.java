package com.jobly.api.model;

import lombok.Builder;
import lombok.Data;



@Data
@Builder
public class CreateUserResponse {
	private String first_name;

	private String message;

	private String email;

	private String token;



}
