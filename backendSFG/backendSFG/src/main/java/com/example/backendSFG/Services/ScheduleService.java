package com.example.backendSFG.Services;

import com.example.backendSFG.Entities.*;
import com.example.backendSFG.Repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
    }

    public schedule createSchedule(schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public schedule updateSchedule(Long id, schedule scheduleDetails) {
        schedule schedule = getScheduleById(id);
        schedule.setCourseCode(scheduleDetails.getCourseCode());
        schedule.setCourseName(scheduleDetails.getCourseName());
        schedule.setDay(scheduleDetails.getDay());
        schedule.setStartTime(scheduleDetails.getStartTime());
        schedule.setEndTime(scheduleDetails.getEndTime());
        schedule.setLocation(scheduleDetails.getLocation());
        schedule.setInstructor(scheduleDetails.getInstructor());
        schedule.setOfficeHours(scheduleDetails.getOfficeHours());
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        schedule schedule = getScheduleById(id);
        scheduleRepository.delete(schedule);
    }

    public List<schedule> getSchedulesByCourseCode(String courseCode) {
        return scheduleRepository.findByCourseCode(courseCode);
    }

    public List<schedule> getSchedulesByInstructor(String instructor) {
        return scheduleRepository.findByInstructor(instructor);
    }

    public List<schedule> getSchedulesByDay(String day) {
        return scheduleRepository.findByDay(day);
    }
}