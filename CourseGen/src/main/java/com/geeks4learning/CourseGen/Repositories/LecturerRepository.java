package com.geeks4learning.CourseGen.Repositories;

import org.springframework.data.jpa.repository.*;

import com.geeks4learning.CourseGen.Entities.*; 

public interface LecturerRepository extends JpaRepository<LecturerEntity, Long> {
    
}
