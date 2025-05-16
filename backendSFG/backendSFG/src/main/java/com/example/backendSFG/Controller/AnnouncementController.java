package com.example.backendSFG.Controller;

import com.example.backendSFG.Entities.Announcement;
import com.example.backendSFG.Services.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping("/lecturer/{lecturerId}")
    public List<Announcement> getLecturerAnnouncements(@PathVariable String lecturerId) {
        return announcementService.getLecturerAnnouncements(lecturerId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Announcement> createAnnouncement(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("type") String type,
            @RequestParam("author") String author,
            @RequestParam(value = "courses", required = false) List<String> courses,
            @RequestParam(value = "targetGroups", required = false) List<String> targetGroups,
            @RequestPart(value = "attachment", required = false) MultipartFile file) throws IOException {

        Announcement announcement = new Announcement();
        announcement.setTitle(title);
        announcement.setContent(content);
        announcement.setType(Announcement.AnnouncementType.fromDisplayName(type)); // Updated this line
        announcement.setAuthor(author);
        announcement.setTargetCourses(courses);
        announcement.setTargetGroups(targetGroups);

        return ResponseEntity.ok(announcementService.createAnnouncement(announcement, file));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(
            @PathVariable Long id,
            @RequestPart("announcement") Announcement announcementDetails,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(announcementService.updateAnnouncement(id, announcementDetails, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable Long id) throws IOException {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/type/{type}")
    public List<Announcement> getAnnouncementsByType(@PathVariable Announcement.AnnouncementType type) {
        return announcementService.getAnnouncementsByType(type);
    }

    @GetMapping("/course/{course}")
    public List<Announcement> getAnnouncementsByCourse(@PathVariable String course) {
        return announcementService.getAnnouncementsByCourse(course);
    }

    @GetMapping("/group/{group}")
    public List<Announcement> getAnnouncementsByGroup(@PathVariable String group) {
        return announcementService.getAnnouncementsByGroup(group);
    }

    @GetMapping("/search")
public ResponseEntity<List<Announcement>> searchAnnouncements(
    @RequestParam(required = false) String query,
    @RequestParam(required = false) String type) {
    
    try {
        List<Announcement> announcements;
        
        if (query != null && !query.isEmpty()) {
            announcements = announcementService.searchAnnouncements(query, type);
        } else if (type != null && !type.isEmpty() && !type.equalsIgnoreCase("all")) {
            announcements = announcementService.getAnnouncementsByType(type);
        } else {
            announcements = announcementService.getAllAnnouncements();
        }
        
        return ResponseEntity.ok(announcements);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
}