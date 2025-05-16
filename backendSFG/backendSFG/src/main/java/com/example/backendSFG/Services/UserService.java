package com.example.backendSFG.Services;

import com.example.backendSFG.DTOs.PendingUserDTO;
import com.example.backendSFG.Entities.User;
import com.example.backendSFG.Entities.UserRole;
import com.example.backendSFG.Repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<PendingUserDTO> getPendingUsers() {
        List<User> pendingUsers = userRepository.findByApprovedFalseAndRoleIn(
            List.of(UserRole.LECTURER, UserRole.STUDENT)
        );
        return pendingUsers.stream()
            .map(user -> modelMapper.map(user, PendingUserDTO.class))
            .collect(Collectors.toList());
    }

    public void approveUser(Long userId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setApproved(true);
            userRepository.save(user);
        });
    }

    public void rejectUser(Long userId) {
        userRepository.deleteById(userId);
    }
}