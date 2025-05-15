package com.example.backendSFG.Controller;

import com.example.backendSFG.DTOs.*;
import com.example.backendSFG.Services.LecturerAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/lecturer")
public class LecturerAuthController {

    private final LecturerAuthService lecturerAuthService;

    public LecturerAuthController(LecturerAuthService lecturerAuthService) {
        this.lecturerAuthService = lecturerAuthService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerLecturer(@RequestBody LecturerDTO registrationDto) {
        return ResponseEntity.ok(lecturerAuthService.registerLecturer(registrationDto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginLecturer(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(lecturerAuthService.authenticateLecturer(loginRequest));
    }
}