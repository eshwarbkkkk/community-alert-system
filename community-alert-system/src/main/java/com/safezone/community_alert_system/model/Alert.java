package com.safezone.community_alert_system.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.v3.oas.annotations.media.Schema;
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
        @Schema(description = "Alert category", example = "FIRE")
        @Enumerated(EnumType.STRING)
        private AlertCategory category; // 🚨 Add this field: e.g. "Fire", "Flood", "Earthquake"

        public AlertCategory getCategory() {
                return category;
        }

        public void setCategory(AlertCategory category) {
                this.category = category;
        }

        private String status; // OPEN, RESOLVED, IGNORED

        @ManyToOne
        @JoinColumn(name = "user_id")
        @JsonBackReference
        private User user;

        @OneToMany(mappedBy = "alert")
        private List<ResponderLog> responders;

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getType() {
                return type;
        }

        public void setType(String type) {
                this.type = type;
        }

        public String getDescription() {
                return description;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public double getLatitude() {
                return latitude;
        }

        public void setLatitude(double latitude) {
                this.latitude = latitude;
        }

        public double getLongitude() {
                return longitude;
        }

        public void setLongitude(double longitude) {
                this.longitude = longitude;
        }

        public LocalDateTime getTimestamp() {
                return timestamp;
        }

        public void setTimestamp(LocalDateTime timestamp) {
                this.timestamp = timestamp;
        }

        public String getStatus() {
                return status;
        }

        public void setStatus(String status) {
                this.status = status;
        }

        public User getUser() {
                return user;
        }

        public void setUser(User user) {
                this.user = user;
        }

        public List<ResponderLog> getResponders() {
                return responders;
        }

        public void setResponders(List<ResponderLog> responders) {
                this.responders = responders;
        }
}


