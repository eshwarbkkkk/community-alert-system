package com.safezone.community_alert_system.repository;

import com.safezone.community_alert_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    @Query(value = """
        SELECT *, (
            6371 * acos(
                cos(radians(:lat)) *
                cos(radians(u.latitude)) *
                cos(radians(u.longitude) - radians(:lon)) +
                sin(radians(:lat)) *
                sin(radians(u.latitude))
            )
        ) AS distance
        FROM user u
        HAVING distance < :radiusKm
        ORDER BY distance
        """, nativeQuery = true)
    List<User> findNearbyUsers(@Param("lat") double lat, @Param("lon") double lon, @Param("radiusKm") double radiusKm);
}
