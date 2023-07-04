package com.jobly.api.model;

import lombok.Data;



@Data
public class CreateUserResponseModel {

	private String firstName;

	private String message;

	private String email;

	private String token;



}
