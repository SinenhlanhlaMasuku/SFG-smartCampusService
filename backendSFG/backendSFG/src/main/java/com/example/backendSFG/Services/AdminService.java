package com.example.backendSFG.Services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendSFG.DTOs.AdminDTO;
import com.example.backendSFG.Entities.*;
import com.example.backendSFG.Model.Message;
import com.example.backendSFG.Repositories.AdminRepository;


@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Message loginAdmin(String email, String password) {
        Optional<AdminEntity> admin = adminRepository.findByEmailAndPassword(email, password);

        Message message = new Message();
    
        if (admin.isPresent()) {
            message.setMessage("successfully");
            message.setResponse("successfully");
        } else {
            message.setResponse("Failure");
            message.setMessage("Invalid email or password.");
        }
    
        return message;
    }

    public Message registerAdmin(AdminDTO admin) {

        Message message = new Message();

        AdminEntity adminEntity = modelMapper.map(admin, AdminEntity.class);

        System.out.println("admin "+ adminEntity);
            AdminEntity registerAdmin = adminRepository.save(adminEntity);

            if (registerAdmin.getAdminId() > 0 && registerAdmin != null) {
                message.setMessage("Admin registered successfully");
                message.setResponse("Status OK");
            } else {
                message.setMessage("Admin failed to register");
                message.setResponse("Please rectify error");
                
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
