package com.example.backendSFG.Repositories;

import org.springframework.data.jpa.repository.*;

import com.example.backendSFG.Entities.*; 

public interface LecturerRepository extends JpaRepository<LecturerEntity, Long> {
    
}
