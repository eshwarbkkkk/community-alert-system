package com.safezone.community_alert_system.service;

import com.safezone.community_alert_system.config.OpenAIConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class OpenAIServiceImpl implements OpenAIService {

    @Autowired
    private OpenAIConfig config;

    @Override
    public String askOpenAI(String userPrompt) {
        String url = config.getApiUrl();

        RestTemplate restTemplate = new RestTemplate();

        // Request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "mistralai/mistral-7b-instruct");
// ✅ correct ID
        // or try "mistral/mixtral-8x7b-instruct"
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", userPrompt)
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(config.getApiKey());

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            Map responseBody = response.getBody();
            List choices = (List) responseBody.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map choice = (Map) choices.get(0);
                Map message = (Map) choice.get("message");
                return (String) message.get("content");
            }
        }

        return "Failed to get response from OpenAI.";
    }
}

