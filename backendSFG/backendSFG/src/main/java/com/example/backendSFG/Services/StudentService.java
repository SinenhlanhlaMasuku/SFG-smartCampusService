package com.example.backendSFG.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backendSFG.Entities.StudentEntity;
import com.example.backendSFG.Repositories.StudentRepository;

@Service
public class StudentService {
 @Autowired
    private StudentRepository studentRepository;
    

    
    public StudentEntity registerStudent(String name, String surname, String email, String password) {
        //  Added a check for duplicate emails during registration.
        if (studentRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }
        StudentEntity student = new StudentEntity(name, surname, email, password);
        return studentRepository.save(student);
    }


    public StudentEntity loginStudent(String email, String password) {
        Optional<StudentEntity> studentOptional = studentRepository.findByEmail(email);
        if (studentOptional.isPresent()) {
            StudentEntity student = studentOptional.get();
          
            if (student.getPassword().equals(password)) {
                return student;
            } else {
                throw new IllegalArgumentException("Invalid password");
            }
        } else {
            throw new IllegalArgumentException("Email not found");
        }
    }

   
}
