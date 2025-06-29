package com.safezone.community_alert_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.safezone.community_alert_system.model")
@EnableJpaRepositories("com.safezone.community_alert_system.repository")
public class CommunityAlertSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommunityAlertSystemApplication.class, args);
	}

}
