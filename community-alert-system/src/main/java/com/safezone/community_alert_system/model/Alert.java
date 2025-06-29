package com.safezone.community_alert_system.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
@Entity
public class Alert {




        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String type; // MEDICAL, FIRE, ASSAULT, etc.
        private String description;

        private double latitude;
        private double longitude;

        private LocalDateTime timestamp;

        private String status; // OPEN, RESOLVED, IGNORED

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @OneToMany(mappedBy = "alert")
        private List<ResponderLog> responders;


}


