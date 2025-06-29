package com.safezone.community_alert_system.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true)
    private String email;

    private String password;
    private String phone;

    private double latitude;
    private double longitude;

    private String role; // CITIZEN, RESPONDER, ADMIN

    private LocalDateTime registeredAt;

    @OneToMany(mappedBy = "user")
    private List<Alert> alerts;
}

