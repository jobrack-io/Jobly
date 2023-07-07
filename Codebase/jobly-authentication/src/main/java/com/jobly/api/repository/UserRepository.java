package com.jobly.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {

    @Query(value = "{email:'?0'}")
    User findUserByEmail(String email);
}
