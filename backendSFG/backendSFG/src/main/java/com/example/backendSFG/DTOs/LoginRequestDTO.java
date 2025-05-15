package com.example.backendSFG.DTOs;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRequestDTO {
    private String email;
    private String password;

}