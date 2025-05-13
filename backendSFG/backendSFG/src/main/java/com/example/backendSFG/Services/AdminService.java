package com.example.backendSFG.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backendSFG.Entities.*;
import com.example.backendSFG.Model.Message;
import com.example.backendSFG.Repositories.AdminRepository;


@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Message loginAdmin(String email, String password) {
        Optional<AdminEntity> admin = adminRepository.findByEmailAndPassword(email, password);

        Message message = new Message();
    
        if (admin.isPresent()) {
            message.setMessage("password");
            message.setResponse("password");
        } else {
            message.setResponse("Failure");
            message.setMessage("Invalid email or password.");
        }
    
        return message;
    }

    public Message registerAdmin(AdminEntity admin) {
        Message message = new Message();
        try {
            adminRepository.save(admin);
            message.setResponse("Success");
            message.setMessage("Admin registered successfully.");
        } catch (Exception e) {
            message.setResponse("Failure");
            message.setMessage("Error registering admin: " + e.getMessage());
        }
        return message;
    }
    
    public Message authenticateAdmin(String email, String password) {
        Optional<AdminEntity> admin = adminRepository.findByEmailAndPassword(email, password);

        Message message = new Message();
    
        if (admin.isPresent()) {
            message.setMessage("password");
            message.setResponse("password");
        } else {
            message.setResponse("Failure");
            message.setMessage("Invalid email or password.");
        }
    
        return message;
    }
    
}
