package com.example.backendSFG.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;

import com.example.backendSFG.Entities.*; 

public interface LecturerRepository extends JpaRepository<LecturerEntity, Long> {

    // Object findByEmail(String email);
    Optional<LecturerEntity> findByEmail(String email);
    
}
