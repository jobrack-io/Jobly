package com.jobly.api.service;

import com.jobly.api.model.LoginRequest;
import com.jobly.api.model.LoginResponse;
import com.jobly.api.util.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class AuthenticationService {
    private AuthenticationManager authenticationManager;
    private UserDetailService userService;
    JwtTokenUtil jwtTokenUtil;

    public ResponseEntity<LoginResponse> loginUser(LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            if (auth.isAuthenticated()) {
                UserDetails userDetails = userService.loadUserByUsername(loginRequest.getEmail());
                String token = jwtTokenUtil.generateToken(userDetails);
                LoginResponse loginResponse =  LoginResponse.builder()
                        .token(token)
                        .error(false).email(userDetails.getUsername()).message("Logged In")
                        .build();
                return ResponseEntity.ok(loginResponse);
            }
              else {
                    throw new AuthenticationException("Invalid Credentials");
                }

        } catch (DisabledException e) {
            return createErrorResponse("User is disabled", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (BadCredentialsException e) {
            return createErrorResponse("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        } catch (AuthenticationException e) {
            return createErrorResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return createErrorResponse("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private ResponseEntity<LoginResponse> createErrorResponse(String errorMessage, HttpStatus status) {
        LoginResponse loginResponse = LoginResponse.builder()
                .error(true)
                .message(errorMessage)
                .build();

        return ResponseEntity.status(status).body(loginResponse);
    }

    /**
     * validateToken the token
     *
     * @param token
     */
    public Boolean validateToken(String token) {
      return  jwtTokenUtil.validateToken(token);
    }
}
