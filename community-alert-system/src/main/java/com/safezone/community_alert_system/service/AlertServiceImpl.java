package com.safezone.community_alert_system.service;

import com.safezone.community_alert_system.exception.ResourceNotFoundException;
import com.safezone.community_alert_system.model.Alert;
import com.safezone.community_alert_system.model.AlertCategory;
import com.safezone.community_alert_system.model.Notification;
import com.safezone.community_alert_system.model.User;
import com.safezone.community_alert_system.repository.AlertRepository;
import com.safezone.community_alert_system.repository.NotificationRepository;
import com.safezone.community_alert_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlertServiceImpl implements AlertService{
    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Alert saveAlert(Alert alert) {
        alert.setTimestamp(LocalDateTime.now());
        Alert savedAlert = alertRepository.save(alert);

        // Find nearby users
        List<User> nearbyUsers = userRepository.findNearbyUsers(alert.getLatitude(), alert.getLongitude(), 5); // 5km radius

        for (User user : nearbyUsers) {
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setMessage("🚨 Nearby emergency: " + alert.getType() + " - " + alert.getDescription());
            notification.setTimestamp(LocalDateTime.now());
            notification.setLatitude(alert.getLatitude());
            notification.setLongitude(alert.getLongitude());
            notificationRepository.save(notification);
        }

        return savedAlert;
    }



    @Override
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    @Override
    public List<Alert> getAlertsByUserId(Long userId) {
        return alertRepository.findByUserId(userId);
    }

    @Override
    public Alert getAlertById(Long id) {
        return  alertRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Alert not found with ID: "+id));
    }

    @Override
    public Alert updateAlertStatus(Long id, String status) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Alert not found"));
        alert.setStatus(status);
        return alertRepository.save(alert);
    }

    @Override
    public List<Alert> getNearbyAlerts(double latitude, double longitude) {
        double RADIUS_KM=5.0;

        return alertRepository.findAll().stream()
                .filter(alert ->{
                    double dist = haversine(latitude, longitude, alert.getLatitude(), alert.getLongitude());
                    return dist <=RADIUS_KM;
                })
                .collect(Collectors.toList());
    }

    //Haversine formula

    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                           Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    @Override
    public Alert createAlert(Alert alert) {
        Alert savedAlert = alertRepository.save(alert);
        notifyNearbyUsers(savedAlert);  // Notify nearby users automatically
        return savedAlert;
    }

   private void notifyNearbyUsers(Alert alert){
        double radiusKm = 5.0;
        double lat=alert.getLatitude();
        double lon=alert.getLongitude();

       // check user is loaded fully
       User alertUser = alert.getUser();
       if(alertUser == null || alertUser.getId() == null){
           System.out.println("⚠️ Alert user data is incomplete.");
           return;
       }
       List<User> allUsers = userRepository.findAll();
       allUsers.stream()
               .filter(user ->!user.getId().equals(alertUser.getId()))//excludes the sender
               .filter(user->haversine(lat, lon, user.getLatitude(), user.getLongitude())<=radiusKm)
               .forEach(user -> {
                   String message = String.format(
                           "\n📢 EMERGENCY NEAR YOU!\n\n" +
                                   "🚨 Type: %s\n" +
                                   "📝 Description: %s\n" +
                                   "📍 Location: https://maps.google.com/?q=%.6f,%.6f\n" +
                                   "🙋 Person in need: %s\n\n" +
                                   "Please help if you're nearby!\n",
                                  alert.getType(),
                                  alert.getDescription(),
                                  lat,lon,
                                  alertUser.getName()
                           );
                   // Simulate notification (can be replaced with email/SMS later)
                   System.out.println("🔔 Notifying: " + user.getName());
                   System.out.println(message);
                   System.out.println("------------------------------------------------");


               });
   }


    @Override
    public List<Alert> getAlertsByStatus(String status) {
        return alertRepository.findByStatusIgnoreCase(status);
    }

    @Override
    public void deleteAlert(Long id) {
        Alert alert= alertRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Alert not found with id: "+id));
        alertRepository.delete(alert);
    }

    @Override
    public List<Alert> getAlertsByCategory(String category) {
        AlertCategory enumCategory = AlertCategory.valueOf(category.toUpperCase());
        return alertRepository.findByCategory(enumCategory);
    }






}
