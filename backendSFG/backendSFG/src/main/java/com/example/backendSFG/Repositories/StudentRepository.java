package com.example.backendSFG.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backendSFG.Entities.*;

public interface StudentRepository extends JpaRepository<StudentEntity, Long>{

}
