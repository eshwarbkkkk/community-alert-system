package com.safezone.community_alert_system.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ResponderLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime respondedAt;
    private double distance;

    @ManyToOne
    @JoinColumn(name = "alert_id")
    private Alert alert;

    @ManyToOne
    @JoinColumn(name = "responder_id")
    private User responder;
}
