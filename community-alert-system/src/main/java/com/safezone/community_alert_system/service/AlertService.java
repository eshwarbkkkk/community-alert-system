package com.safezone.community_alert_system.service;

import com.safezone.community_alert_system.model.Alert;

import java.util.List;

public interface AlertService {
    Alert saveAlert(Alert alert);
    List<Alert> getAllAlerts();
    List<Alert> getAlertsByUserId(Long userId);

    Alert getAlertById(Long id);
    Alert updateAlertStatus(Long id, String status);
    List<Alert> getNearbyAlerts(double latitude, double longitude);
    Alert createAlert(Alert alert);

    List<Alert> getAlertsByStatus(String status);

    void deleteAlert(Long id);

    List<Alert> getAlertsByCategory(String category);


}
