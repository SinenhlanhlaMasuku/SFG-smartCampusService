import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../Services/view-announcements.service';
import { Announcement } from '../../models/announcement.model';

@Component({
  selector: 'app-view-announcements',
  templateUrl: './view-announcements.component.html',
  styleUrls: ['./view-announcements.component.css']
})
export class ViewAnnouncementsComponent implements OnInit {
  isCollapsed = true;
  isLoading: boolean = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  selectedFilter: string = 'all';
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.searchAnnouncements();
  }

  loadAnnouncements(): void {
    this.searchAnnouncements(); // This will load all announcements initially
  }

  filterAnnouncements(): void {
    this.filteredAnnouncements = this.announcements.filter(announcement => {
      // Apply type filter
      const typeMatch = this.selectedFilter === 'all' ||
        announcement.type.toLowerCase() === this.selectedFilter.toLowerCase();

      // Apply search filter
      const searchMatch = !this.searchQuery ||
        announcement.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        announcement.author.toLowerCase().includes(this.searchQuery.toLowerCase());

      return typeMatch && searchMatch;
    });
  }

  markAsRead(announcement: Announcement): void {
    if (!announcement.readStatus) {
      this.announcementService.markAsRead(announcement.id).subscribe(
        () => {
          announcement.readStatus = true;
        },
        error => this.errorMessage = 'Failed to mark announcement as read'
      );
    }
  }
  searchAnnouncements(): void {
  this.isLoading = true;
  
  this.announcementService.searchAnnouncements(
    this.searchQuery,
    this.selectedFilter
  ).subscribe({
    next: (announcements) => {
      this.filteredAnnouncements = announcements;
      this.isLoading = false;
    },
    error: (error) => {
      this.errorMessage = 'Failed to load announcements';
      this.isLoading = false;
      console.error(error);
    }
  });
}

getBadgeClass(type: string): string {
  if (!type) return 'General';
  
  // Convert to lowercase for case-insensitive comparison
  const typeLower = type.toLowerCase();
  
  switch(typeLower) {
    case 'academic': return 'Academic';
    case 'event': return 'Event';
    case 'important': return 'Important';
    default: return 'General';
  }
}
}