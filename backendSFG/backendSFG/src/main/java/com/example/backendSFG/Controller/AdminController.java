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
    public Message login(@RequestBody AdminDTO adminLogin) {
        return adminService.loginAdmin(adminLogin.getEmail(), adminLogin.getPassword());
    }

    @PostMapping("/Adminregister")
    public Message register(@RequestBody AdminDTO adminRegister) {
        return adminService.registerAdmin(adminRegister);
    }
}
