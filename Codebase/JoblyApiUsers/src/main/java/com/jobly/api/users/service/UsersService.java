package com.jobly.api.users.service;

import com.jobly.api.users.shared.UserDto;



public interface UsersService{
	UserDto createUser(UserDto userDetails);
	UserDto getUserDetailsByEmail(String email) throws Exception;

	String loadUserByUsername(String username) throws Exception;
}
