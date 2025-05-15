package com.example.backendSFG.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backendSFG.Entities.StudentEntity;
import com.example.backendSFG.Services.StudentService;

public class StudentControlle {
 @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<StudentEntity> registerStudent(@RequestBody Map<String, String> registrationData) {
        try{
            String name = registrationData.get("name");
            String surname = registrationData.get("surname");
            String email = registrationData.get("email");
            String password = registrationData.get("password");
             StudentEntity registeredStudent = studentService.registerStudent(name, surname, email, password);
             return new ResponseEntity<>(registeredStudent, HttpStatus.CREATED);
        }
        catch(IllegalArgumentException e){
             return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
}
}