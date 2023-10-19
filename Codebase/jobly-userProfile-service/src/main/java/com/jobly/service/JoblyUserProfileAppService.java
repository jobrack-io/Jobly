package com.jobly.service;

import com.jobly.client.UserProfileFetchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JoblyUserProfileAppService {

    @Autowired
    private UserProfileFetchService userProfileFetchService;

    public String greeting() {
        return "Welcome to Jobly Home Page Service";
    }

    public String userProfileService(String userId) {
        return userProfileFetchService.fetchUserProfile(userId);
    }
}
