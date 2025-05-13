package com.example.backendSFG.Entities;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor

@Data
@Entity
@Table(name = "Lecturer")
public class LecturerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LecturerId")
    private long LecturerId;

    @Column(name = "Name")
    private String Name;

    @Column(name = "Surname")
    private String Surname;

    @Column(name = "Email")
    private String email;

    @Column(name = "Password")
    private String password;
}