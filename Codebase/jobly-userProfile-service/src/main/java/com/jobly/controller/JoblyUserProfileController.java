package com.jobly.controller;

import com.jobly.service.JoblyUserProfileAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jobly")
public class JoblyUserProfileController {

    @Autowired
    private JoblyUserProfileAppService service;

    @GetMapping("/home")
    public String greetingMessage() {
        return service.greeting();
    }

    @GetMapping("/userProfile/{profile}")
    public String checkOrderStatus(@PathVariable String userID) {
        return service.userProfileService(userID);
    }
}
