package com.jobly.api.users.service;

import java.util.ArrayList;
import java.util.UUID;

import com.jobly.api.users.data.UserEntity;
import com.jobly.api.users.data.UsersRepository;
import com.jobly.api.users.shared.UserDto;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;



@Service
public class UsersServiceImpl implements UsersService {
	
	UsersRepository usersRepository;
	//BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public UsersServiceImpl(UsersRepository usersRepository)
	{
		this.usersRepository = usersRepository;
		//this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
 
	@Override
	public UserDto createUser(UserDto userDetails) {
		// TODO Auto-generated method stub
		
		userDetails.setUserId(UUID.randomUUID().toString());
		//userDetails.setEncryptedPassword(bCryptPasswordEncoder.encode(userDetails.getPassword()));

		ModelMapper modelMapper = new ModelMapper(); 
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		UserEntity userEntity = modelMapper.map(userDetails, UserEntity.class);

		usersRepository.save(userEntity);
		
		UserDto returnValue = modelMapper.map(userEntity, UserDto.class);
 
		return returnValue;
	}

	@Override
	public String loadUserByUsername(String username) throws Exception {
		UserEntity userEntity = usersRepository.findByEmail(username);
		
		if(userEntity == null) throw new Exception();
		
		return userEntity.getFirstName();
	}

	@Override
	public UserDto getUserDetailsByEmail(String email) throws Exception {
		UserEntity userEntity = usersRepository.findByEmail(email);
		
		if(userEntity == null) throw new Exception();;
		
		return new ModelMapper().map(userEntity, UserDto.class);
	}

}
