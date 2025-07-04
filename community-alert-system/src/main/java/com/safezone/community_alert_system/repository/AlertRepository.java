package com.safezone.community_alert_system.repository;

import com.safezone.community_alert_system.model.Alert;
import com.safezone.community_alert_system.model.AlertCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByUserId(Long UserId);

    List<Alert> findByStatusIgnoreCase(String status);

    List<Alert> findByCategory(AlertCategory category);
}
