package com.safezone.community_alert_system.service;

import com.safezone.community_alert_system.dto.UserUpdateDTO;
import com.safezone.community_alert_system.exception.ResourceNotFoundException;
import com.safezone.community_alert_system.model.User;
import com.safezone.community_alert_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;


    @Override
    public User registerUser(User user) {
        user.setRegisteredAt(java.time.LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    @Override
    public User updateUser(Long id, UserUpdateDTO dto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        existingUser.setName(dto.getName());
        existingUser.setEmail(dto.getEmail());
        existingUser.setPhone(dto.getPhone());
        existingUser.setLatitude(dto.getLatitude());
        existingUser.setLongitude(dto.getLongitude());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: "+id));
        userRepository.delete(existingUser);
    }


}
