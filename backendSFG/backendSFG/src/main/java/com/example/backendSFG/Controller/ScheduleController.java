package com.example.backendSFG.Controller;

import com.example.backendSFG.Entities.*;
import com.example.backendSFG.Services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @GetMapping("/{id}")
    public ResponseEntity<schedule> getScheduleById(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleById(id));
    }

    @PostMapping
    public schedule createSchedule(@RequestBody schedule schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<schedule> updateSchedule(@PathVariable Long id, @RequestBody schedule scheduleDetails) {
        return ResponseEntity.ok(scheduleService.updateSchedule(id, scheduleDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/course/{courseCode}")
    public List<schedule> getSchedulesByCourseCode(@PathVariable String courseCode) {
        return scheduleService.getSchedulesByCourseCode(courseCode);
    }

    @GetMapping("/instructor/{instructor}")
    public List<schedule> getSchedulesByInstructor(@PathVariable String instructor) {
        return scheduleService.getSchedulesByInstructor(instructor);
    }

    @GetMapping("/day/{day}")
    public List<schedule> getSchedulesByDay(@PathVariable String day) {
        return scheduleService.getSchedulesByDay(day);
    }
}
