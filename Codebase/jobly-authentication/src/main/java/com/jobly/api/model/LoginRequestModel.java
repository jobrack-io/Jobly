package com.jobly.api.model;


import lombok.Data;

@Data
public class LoginRequestModel {
	private String userName;
	private String password;

}
