package com.safezone.community_alert_system.controller;

import com.safezone.community_alert_system.model.Notification;
import com.safezone.community_alert_system.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepo;

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(@PathVariable Long userId) {
        return notificationRepo.findByUserIdOrderByTimestampDesc(userId);
    }
    @PutMapping("/{id}/seen")
    public ResponseEntity<?> markNotificationAsSeen(@PathVariable Long id) {
        Optional<Notification> optional = notificationRepo.findById(id);
        if (optional.isPresent()) {
            Notification notification = optional.get();
            notification.setSeen(true);
            notificationRepo.save(notification);
            return ResponseEntity.ok("Marked as seen");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
        if (notificationRepo.existsById(id)) {
            notificationRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}
