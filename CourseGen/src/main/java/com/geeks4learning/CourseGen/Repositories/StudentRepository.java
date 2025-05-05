package com.geeks4learning.CourseGen.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geeks4learning.CourseGen.Entities.*;

public interface StudentRepository extends JpaRepository<StudentEntity, Long>{

}
