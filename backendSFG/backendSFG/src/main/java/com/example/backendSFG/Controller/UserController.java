package com.example.backendSFG.Controller;

import com.example.backendSFG.DTOs.PendingUserDTO;
import com.example.backendSFG.Model.Message;
import com.example.backendSFG.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/pending")
    public ResponseEntity<List<PendingUserDTO>> getPendingUsers() {
        return ResponseEntity.ok(userService.getPendingUsers());
    }

    @PostMapping("/approve/{userId}")
    public ResponseEntity<Message> approveUser(@PathVariable Long userId) {
        userService.approveUser(userId);
        return (ResponseEntity<Message>) ResponseEntity.ok();
    }

    @PostMapping("/reject/{userId}")
    public ResponseEntity<Message> rejectUser(@PathVariable Long userId) {
        userService.rejectUser(userId);
                return (ResponseEntity<Message>) ResponseEntity.ok();

    }
}
