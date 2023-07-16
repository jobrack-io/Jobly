package com.jobly.api.service;

import com.jobly.api.repository.UserEntity;
import com.jobly.api.repository.UserRepository;
import com.jobly.api.util.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserDetailService implements org.springframework.security.core.userdetails.UserDetailsService {

    final UserRepository userRepository;
    final JwtTokenUtil jwtTokenUtil;


    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findUserByEmail(email);
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("USER_ROLE"));
        return new User(user.getEmail(), user.getPassword(), authorityList);
    }

    public UserEntity createUserDetails(UserEntity user) {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("USER_ROLE"));
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        String token = jwtTokenUtil.generateToken(new User(user.getEmail(), user.getPassword(), authorityList));
       return  userRepository.save(user);


    }

}
