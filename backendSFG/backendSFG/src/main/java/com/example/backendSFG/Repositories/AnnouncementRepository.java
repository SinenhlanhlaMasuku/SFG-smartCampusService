package com.example.backendSFG.Repositories;


import com.example.backendSFG.Entities.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByAuthor(String author);
    List<Announcement> findByType(Announcement.AnnouncementType type);
    List<Announcement> findByTargetCoursesContaining(String course);
    List<Announcement> findByTargetGroupsContaining(String group);
} 
