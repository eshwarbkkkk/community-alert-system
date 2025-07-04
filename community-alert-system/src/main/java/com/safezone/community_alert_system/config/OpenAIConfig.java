package com.safezone.community_alert_system.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAIConfig {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    public String getApiKey(){
        return apiKey;
    }
    public String getApiUrl(){
        return apiUrl;
    }
}
