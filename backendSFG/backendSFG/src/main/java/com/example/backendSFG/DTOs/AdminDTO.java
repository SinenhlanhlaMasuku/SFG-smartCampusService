package com.example.backendSFG.DTOs;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminDTO {

    private String name;
    private String surname;
    private String email;
    private String password;
}
