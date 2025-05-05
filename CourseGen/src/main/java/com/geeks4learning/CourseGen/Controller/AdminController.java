package com.geeks4learning.CourseGen.Controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.geeks4learning.CourseGen.DTOs.*;
import com.geeks4learning.CourseGen.Model.*;
import com.geeks4learning.CourseGen.Services.*;

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
 
//     @PostMapping("/Trainerlogin")
//     public ResponseEntity<String> login(@RequestBody TrainerDTO trainerLogin) {
 
//         Message authResponse = trainerService.authenticateTrainer(trainerLogin.getEmail(), trainerLogin.getPassword());
 
//         if ("Success".equals(authResponse.getResponse())) {
//             return ResponseEntity.ok(authResponse.getMessage());
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse.getMessage());
//         }
//     }

//  @GetMapping("/pending-trainers")
// public List<PendingDTO> getPendingTrainers() {
//     List<TrainerEntity> trainers = trainerRepository.findByStatus("pending");
//     return trainers.stream()
//                    .map(trainer -> new PendingDTO(trainer.getUserId(), trainer.getName(), trainer.getSurname(), trainer.getEmail()))
//                    .collect(Collectors.toList());
// }

//     // @GetMapping("/pending-trainers")
//     // public List<PendingDTO> getPendingTrainers() {
//     //     List<TrainerEntity> trainers = trainerRepository.findByStatus("pending");
//     //     return trainers.stream()
//     //             .map(trainer -> new PendingDTO(trainer.getUserId(), trainer.getName(), trainer.getSurname(), trainer.getEmail()))
//     //             .collect(Collectors.toList());
//     // }

//     @PostMapping("/approve-trainer/{UserId}")
// public ResponseEntity<Map<String, String>> approveTrainer(@PathVariable Long UserId) {
//     Optional<TrainerEntity> trainer = trainerRepository.findById(UserId);
//     if (trainer.isPresent()) {
//         TrainerEntity t = trainer.get();
//         t.setStatus("active");
//         trainerRepository.save(t);
//         // Return JSON response
//         Map<String, String> response = new HashMap<>();
//         response.put("message", "Trainer approved");
//         return ResponseEntity.ok(response);
//     }
//     Map<String, String> errorResponse = new HashMap<>();
//     errorResponse.put("message", "Trainer not found");
//     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
// }

// @PostMapping("/reject-trainer/{id}")
// public ResponseEntity<Map<String, String>> rejectTrainer(@PathVariable Long id) {
//     if (trainerRepository.existsById(id)) {
//         trainerRepository.deleteById(id);
//         // Return JSON response
//         Map<String, String> response = new HashMap<>();
//         response.put("message", "Trainer rejected");
//         return ResponseEntity.ok(response);
//     }
//     Map<String, String> errorResponse = new HashMap<>();
//     errorResponse.put("message", "Trainer not found");
//     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
// }

// @PutMapping("/update-status")
// public ResponseEntity<Map<String, String>> updateTrainerStatus(@RequestBody Map<String, String> request) {
//     String email = request.get("email");
//     String status = request.get("status");

//     Optional<TrainerEntity> trainerOptional = trainerRepository.findByEmail(email);
//     if (trainerOptional.isPresent()) {
//         TrainerEntity trainer = trainerOptional.get();
//         trainer.setStatus(status);
//         trainerRepository.save(trainer);

//         Map<String, String> response = new HashMap<>();
//         response.put("message", "Trainer status updated successfully.");
//         return ResponseEntity.ok(response);
//     } else {
//         Map<String, String> errorResponse = new HashMap<>();
//         errorResponse.put("message", "Trainer not found.");
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
//     }
// }


}
