package com.jobly.api.controller;

import com.jobly.api.model.CreateUserRequestModel;
import com.jobly.api.model.CreateUserResponseModel;
import com.jobly.api.model.LoginRequestModel;
import com.jobly.api.model.LoginResponseModel;
import com.jobly.api.repository.User;
import com.jobly.api.repository.UserRepository;
import com.jobly.api.service.UserDetailsService;
import com.jobly.api.util.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@Tag(name = "Authentication Controller", description = "Endpoints for user authentication")
public class AuthenticationController {

    protected final Log logger = LogFactory.getLog(getClass());
    final UserRepository userRepository;
    final AuthenticationManager authenticationManager;
    final UserDetailsService userDetailsService;
    final JwtTokenUtil jwtTokenUtil;

    public AuthenticationController(UserRepository userRepository, AuthenticationManager authenticationManager,
                                    UserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping(path = "/signin",consumes = {MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    @Operation(summary = "Login User", description = "Login User")
    public ResponseEntity<LoginResponseModel> loginUser(@RequestBody LoginRequestModel loginRequestModel) {
        LoginResponseModel loginResponseModel = new LoginResponseModel();
        try {

            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestModel.getEmail(),
                    loginRequestModel.getPassword()));
            if (auth.isAuthenticated()) {
                logger.info("Logged In");
                UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestModel.getEmail());
                String token = jwtTokenUtil.generateToken(userDetails);
                loginResponseModel.setEmail(userDetails.getUsername());
                loginResponseModel.setError(false);
                loginResponseModel.setMessage("Logged In");
                loginResponseModel.setToken(token);
                return ResponseEntity.ok(loginResponseModel);
            } else {
                loginResponseModel.setError(true);
                loginResponseModel.setMessage("Invalid Credentials");
                return ResponseEntity.status(401).body(loginResponseModel);
            }
        } catch (DisabledException e) {
            e.printStackTrace();
            loginResponseModel.setError(true);
            loginResponseModel.setMessage("User is disabled");
            return ResponseEntity.status(500).body(loginResponseModel);

        } catch (BadCredentialsException e) {
            loginResponseModel.setError(true);
            loginResponseModel.setMessage("Invalid Credentials");
            return ResponseEntity.status(500).body(loginResponseModel);
        } catch (Exception e) {
            e.printStackTrace();
            loginResponseModel.setError(true);
            loginResponseModel.setMessage("Something went wrong");
            return ResponseEntity.status(500).body(loginResponseModel);

        }
    }




    @PostMapping(path = "/signup",consumes = {MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    @Operation(summary = "Register User", description = "Create a new user account.")
    public ResponseEntity<CreateUserResponseModel> createUser(@RequestBody CreateUserRequestModel userDetails)
    {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        User user = modelMapper.map(userDetails, User.class);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        UserDetails userDt = userDetailsService.createUserDetails(user.getEmail(), user.getPassword());
        String token = jwtTokenUtil.generateToken(userDt);
        userRepository.save(user);
        CreateUserResponseModel returnValue =new CreateUserResponseModel();
        returnValue.setFirst_name(user.getFirst_name());
        returnValue.setEmail(user.getEmail());
        returnValue.setMessage("Account created successfully");
        returnValue.setToken(token);
        return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);

    }


}

