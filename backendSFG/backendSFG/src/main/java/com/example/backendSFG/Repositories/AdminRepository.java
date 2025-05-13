package com.example.backendSFG.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backendSFG.Entities.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
    Optional<AdminEntity> findByEmailAndPassword(String Email, String Password);
}

