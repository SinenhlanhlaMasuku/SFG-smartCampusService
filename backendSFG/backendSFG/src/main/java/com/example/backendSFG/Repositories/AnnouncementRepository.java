package com.example.backendSFG.Repositories;


import com.example.backendSFG.Entities.Announcement;
import com.example.backendSFG.Entities.Announcement.AnnouncementType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByAuthor(String author);
    List<Announcement> findByType(Announcement.AnnouncementType type);
    List<Announcement> findByTargetCoursesContaining(String course);
    List<Announcement> findByTargetGroupsContaining(String group);

    @Query("SELECT a FROM Announcement a WHERE " +
       "a.author = :authorId AND " +
       "(LOWER(a.title) LIKE LOWER(:query) OR " +
       "LOWER(a.content) LIKE LOWER(:query)) AND " +
       "(:type IS NULL OR a.type = :type)")
List<Announcement> findByAuthorAndSearchQuery(
    @Param("authorId") String authorId,
    @Param("query") String query,
    @Param("type") AnnouncementType type);

    List<Announcement> findByAuthorAndType(String author, AnnouncementType type);

    @Query("SELECT a FROM Announcement a WHERE " +
       "(LOWER(a.title) LIKE LOWER(:query) OR " +
       "LOWER(a.content) LIKE LOWER(:query)) AND " +
       "(:type IS NULL OR a.type = :type)")
List<Announcement> findBySearchQuery(
    @Param("query") String query,
    @Param("type") AnnouncementType type);
} 
