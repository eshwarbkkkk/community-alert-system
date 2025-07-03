package com.safezone.community_alert_system.controller;

import com.safezone.community_alert_system.dto.UpdateStatusRequest;
import com.safezone.community_alert_system.model.Alert;
import com.safezone.community_alert_system.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin
public class AlertController {
    @Autowired
    private AlertService alertService;

    @PostMapping
    public Alert createAlert(@RequestBody Alert alert){
       return alertService.saveAlert(alert);
    }

    @GetMapping
    public List<Alert> getAllAlerts(){
        return alertService.getAllAlerts();
    }

    @GetMapping("/user/{userId}")
    public List<Alert> getAlertsByUser(@PathVariable Long userId){
        return alertService.getAlertsByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable Long id){
        Alert alert = alertService.getAlertById(id);
        return ResponseEntity.ok(alert);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Alert> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request){
        Alert updated = alertService.updateAlertStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }
    @GetMapping("/nearby")
    public ResponseEntity<List<Alert>> getNearbyAlert(
            @RequestParam double lat,
            @RequestParam double lon){
        List<Alert> nearby= alertService.getNearbyAlerts(lat, lon);
        return ResponseEntity.ok(nearby);
    }
}
