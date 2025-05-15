package com.example.backendSFG.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor

@Data
@Entity
@Table(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private LocalDateTime date = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnouncementType type;

    @Column(nullable = false)
    private boolean readStatus = false;

    @ElementCollection
    @CollectionTable(name = "announcement_target_courses", joinColumns = @JoinColumn(name = "announcement_id"))
    @Column(name = "course")
    private List<String> targetCourses;

    @ElementCollection
    @CollectionTable(name = "announcement_target_groups", joinColumns = @JoinColumn(name = "announcement_id"))
    @Column(name = "target_group")
    private List<String> targetGroups;

    @Embedded
    private Attachment attachment;

    public enum AnnouncementType {
        ACADEMIC("Academic"),
        EVENT("Event"),
        IMPORTANT("Important"),
        GENERAL("General");

        private final String displayName;

        AnnouncementType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }

        public static AnnouncementType fromDisplayName(String displayName) {
            for (AnnouncementType type : AnnouncementType.values()) {
                if (type.displayName.equalsIgnoreCase(displayName)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("No enum constant with display name: " + displayName);
        }
    }

    @Embeddable
    public static class Attachment {
        private String name;
        private String url;

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

}