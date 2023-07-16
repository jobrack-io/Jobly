package com.jobly.api.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private boolean error;
    private String message;

    private String email;

    private String token;

}
