package com.jobly.api.model;


import lombok.Data;

@Data
public class LoginRequestModel {
	private String email;
	private String password;

}
