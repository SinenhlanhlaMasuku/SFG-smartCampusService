package com.example.backendSFG.Repositories;

import com.example.backendSFG.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<schedule, Long> {
    List<schedule> findByCourseCode(String courseCode);
    List<schedule> findByInstructor(String instructor);
    List<schedule> findByDay(String day);
}