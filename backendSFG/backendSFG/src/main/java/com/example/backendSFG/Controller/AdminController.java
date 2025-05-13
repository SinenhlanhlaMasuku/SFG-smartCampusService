package com.example.backendSFG.Controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.backendSFG.DTOs.*;
import com.example.backendSFG.Model.*;
import com.example.backendSFG.Services.*;

@RestController
@RequestMapping("/Admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
 
    @Autowired
    private AdminService adminService;
 
    @PostMapping("/Adminlogin")
    public ResponseEntity<String> login(@RequestBody AdminDTO adminLogin) {
 
        Message authResponse = adminService.authenticateAdmin(adminLogin.getEmail(), adminLogin.getPassword());
 
        if ("Success".equals(authResponse.getResponse())) {
            return ResponseEntity.ok(authResponse.getMessage());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse.getMessage());
        }
    }
}
