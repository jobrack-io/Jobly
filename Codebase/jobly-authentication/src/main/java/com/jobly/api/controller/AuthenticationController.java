package com.jobly.api.controller;

import com.jobly.api.model.CreateUserRequest;
import com.jobly.api.model.CreateUserResponse;
import com.jobly.api.model.LoginRequest;
import com.jobly.api.model.LoginResponse;
import com.jobly.api.repository.UserEntity;
import com.jobly.api.service.AuthenticationService;
import com.jobly.api.service.UserDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController

@AllArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/user")
@Tag(name = "Authentication Controller", description = "Endpoints for user authentication")
public class AuthenticationController {

    protected final Log logger = LogFactory.getLog(getClass());

    final AuthenticationService authenticationService;
    final UserDetailService userDetailsService;

    @PostMapping(path = "/signin", consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @Operation(summary = "Login User", description = "Login User")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequestModel) {
        logger.info("logging module");
        return authenticationService.loginUser(loginRequestModel);
    }

    @PostMapping(path = "/signup", consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @Operation(summary = "Register User", description = "Create a new user account.")
    public ResponseEntity<CreateUserResponse> createUser(@RequestBody CreateUserRequest userDetails) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserEntity user = modelMapper.map(userDetails, UserEntity.class);
        UserEntity userDetail = userDetailsService.createUserDetails(user);
        CreateUserResponse userResponseModel = CreateUserResponse.builder()
                .email(userDetail.getEmail()).message("Account created successfully").build();
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseModel);
    }


}

