package com.example.backendSFG.Services;

import com.example.backendSFG.Entities.Announcement;
import com.example.backendSFG.Repositories.AnnouncementRepository;
import com.example.backendSFG.config.FileStorageProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import org.springframework.util.*;

import java.time.*;
import java.util.List;

import com.example.backendSFG.config.FileStorageProperties;


@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final Path rootLocation = Paths.get("uploads");
    private final Path fileStorageLocation;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository, FileStorageProperties fileStorageProperties) {
        this.announcementRepository = announcementRepository;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException(
                "Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public List<Announcement> getLecturerAnnouncements(String lecturerId) {
        return announcementRepository.findByAuthor(lecturerId);
    }

    public Announcement createAnnouncement(Announcement announcement, MultipartFile file) throws IOException {
    if (file != null && !file.isEmpty()) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        Path targetLocation = this.fileStorageLocation.resolve(filename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        
        Announcement.Attachment attachment = new Announcement.Attachment();
        attachment.setName(filename);
        attachment.setUrl("/uploads/" + filename);
        announcement.setAttachment(attachment);
    }
    
    announcement.setDate(LocalDateTime.now());
    return announcementRepository.save(announcement);
}

    public Announcement updateAnnouncement(Long id, Announcement announcementDetails, MultipartFile file) throws IOException {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        
        if (file != null && !file.isEmpty()) {
            // Delete old file if exists
            if (announcement.getAttachment() != null) {
                Files.deleteIfExists(rootLocation.resolve(announcement.getAttachment().getName()));
            }
            
            // Save new file
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), rootLocation.resolve(filename));
            
            Announcement.Attachment attachment = new Announcement.Attachment();
            attachment.setName(file.getOriginalFilename());
            attachment.setUrl("/uploads/" + filename);
            announcement.setAttachment(attachment);
        }
        
        announcement.setTitle(announcementDetails.getTitle());
        announcement.setContent(announcementDetails.getContent());
        announcement.setType(announcementDetails.getType());
        announcement.setTargetCourses(announcementDetails.getTargetCourses());
        announcement.setTargetGroups(announcementDetails.getTargetGroups());
        
        return announcementRepository.save(announcement);
    }

    public void deleteAnnouncement(Long id) throws IOException {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        
        if (announcement.getAttachment() != null) {
            Files.deleteIfExists(rootLocation.resolve(announcement.getAttachment().getName()));
        }
        
        announcementRepository.delete(announcement);
    }

    public List<Announcement> getAnnouncementsByType(Announcement.AnnouncementType type) {
        return announcementRepository.findByType(type);
    }

    public List<Announcement> getAnnouncementsByCourse(String course) {
        return announcementRepository.findByTargetCoursesContaining(course);
    }

    public List<Announcement> getAnnouncementsByGroup(String group) {
        return announcementRepository.findByTargetGroupsContaining(group);
    }
}