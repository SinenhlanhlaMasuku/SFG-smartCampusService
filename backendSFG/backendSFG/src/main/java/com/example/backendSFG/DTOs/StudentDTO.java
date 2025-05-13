package com.example.backendSFG.DTOs;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentDTO {

    private String Name;
    private String Surname;
    private String email;
    private String password;
}
