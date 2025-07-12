package com.safezone.community_alert_system.service;


import com.safezone.community_alert_system.dto.UserUpdateDTO;
import com.safezone.community_alert_system.model.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);


    User updateUser(Long id, UserUpdateDTO dto);
    void deleteUser(Long id);

    User findByEmail(String email);
    List<User> findNearbyUsers(double lat, double lon, double radiusKm);
}
