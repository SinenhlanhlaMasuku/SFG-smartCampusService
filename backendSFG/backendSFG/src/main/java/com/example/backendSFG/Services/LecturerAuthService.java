package com.example.backendSFG.Services;

import com.example.backendSFG.Entities.*;
import com.example.backendSFG.Repositories.LecturerRepository;
import com.example.backendSFG.DTOs.*;
import com.example.backendSFG.config.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LecturerAuthService {

    private final LecturerRepository lecturerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public LecturerEntity registerLecturer(LecturerDTO registrationDto) {
        LecturerEntity lecturer = new LecturerEntity();
        lecturer.setEmail(registrationDto.getEmail());
        lecturer.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        lecturer.setFullName(registrationDto.getFullName());
        lecturer.setStaffId(registrationDto.getStaffId());
        lecturer.setDepartment(registrationDto.getDepartment());
        
        return lecturerRepository.save(lecturer);
    }

    public String authenticateLecturer(LoginRequestDTO loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        
        LecturerEntity lecturer = lecturerRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("Lecturer not found"));
        
        return jwtTokenProvider.generateToken(lecturer.getEmail());
    }
}