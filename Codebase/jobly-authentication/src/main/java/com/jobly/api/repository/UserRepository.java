package com.jobly.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findFirstUserByEmail(String email);


}
