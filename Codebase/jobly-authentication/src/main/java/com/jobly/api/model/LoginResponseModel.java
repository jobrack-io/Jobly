package com.jobly.api.model;

import lombok.Data;

@Data
public class LoginResponseModel {

    private boolean error;
    private String message;

    private String email;

    private String token;

}