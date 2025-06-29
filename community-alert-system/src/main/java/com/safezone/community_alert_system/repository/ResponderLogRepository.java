package com.safezone.community_alert_system.repository;

import com.safezone.community_alert_system.model.ResponderLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponderLogRepository extends JpaRepository<ResponderLog, Long> {
    List<ResponderLog> findByAlertId(Long alertId);
}

