package com.example.backendSFG.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backendSFG.Entities.*;




public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
        Optional<StudentEntity> findByEmail(String email); // Added for login
        boolean existsByEmail(String email); //Added for checking if email exists
}