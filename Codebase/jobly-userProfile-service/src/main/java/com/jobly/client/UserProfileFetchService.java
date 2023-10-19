package com.jobly.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserProfileFetchService {
    @Autowired
    private RestTemplate template;

    public String fetchUserProfile(String userID) {
        //return template.getForObject("http://<UserProfileServices>-SERVICE/" + userID, OrderResponseDTO.class);
        return "userProfile";
    }
}
