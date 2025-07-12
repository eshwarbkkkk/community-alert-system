package com.safezone.community_alert_system.controller;

import com.safezone.community_alert_system.service.OpenAIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*") // Allow all frontend domains during development
@RestController
@RequestMapping("/api/ai")
public class OpenAIController {

    @Autowired
    private OpenAIService service;

    @Operation(summary = "Ask the AI a question (e.g., disaster safety, emergency preparedness, etc.)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully received AI response"),
            @ApiResponse(responseCode = "500", description = "Internal server error from AI or backend")
    })
    @GetMapping("/ask")
    public ResponseEntity<String> ask(@RequestParam String question) {
        try {
            if (question == null || question.trim().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "❗ Question is required");
            }

            String response = service.askOpenAI(question);

            // For debugging
            System.out.println("🔍 User asked: " + question);
            System.out.println("🤖 AI said: " + response);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace(); // Optional: log to file in production
            return ResponseEntity.status(500).body("⚠️ Failed to fetch AI suggestions. Please try again later.");
        }
    }
}
