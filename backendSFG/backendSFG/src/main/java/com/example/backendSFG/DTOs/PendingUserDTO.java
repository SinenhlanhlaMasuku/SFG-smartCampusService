package com.example.backendSFG.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingUserDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String role;
}