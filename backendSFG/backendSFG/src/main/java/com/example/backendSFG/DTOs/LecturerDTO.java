package com.example.backendSFG.DTOs;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LecturerDTO {
    private String fullName;
    private String email;
    private String staffId;
    private String password;
    private String department;
}
