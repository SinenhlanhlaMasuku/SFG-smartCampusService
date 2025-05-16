package com.example.backendSFG.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backendSFG.Entities.StudentEntity;
import com.example.backendSFG.Services.StudentService;


@RestController
@RequestMapping("api/Student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
     @Autowired
     private StudentService studentService;

     @PostMapping("/register")
     public ResponseEntity<StudentEntity> registerStudent(@RequestBody Map<String, String> registrationData) {
          try {
               String name = registrationData.get("name");
               String surname = registrationData.get("surname");
               String email = registrationData.get("email");
               String password = registrationData.get("password");
               StudentEntity registeredStudent = studentService.registerStudent(name, surname, email, password);
               return new ResponseEntity<>(registeredStudent, HttpStatus.CREATED);
          } catch (IllegalArgumentException e) {
               return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
          }
     }

     @PostMapping("/login")
public ResponseEntity<?> loginStudent(@RequestBody Map<String, String> loginData) {
    try {
        String email = loginData.get("email");
        String password = loginData.get("password");

        StudentEntity student = studentService.loginStudent(email, password);
        
        // You can add a JWT token later here
        return new ResponseEntity<>(student, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
        return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.UNAUTHORIZED);
    }
}

}