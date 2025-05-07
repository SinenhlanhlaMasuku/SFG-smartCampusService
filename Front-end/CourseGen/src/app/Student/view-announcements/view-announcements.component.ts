import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../Services/view-announcements.service';
import { Announcement } from '../../models/announcement.model';

@Component({
  selector: 'app-view-announcements',
  templateUrl: './view-announcements.component.html',
  styleUrls: ['./view-announcements.component.css']
})
export class ViewAnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  selectedFilter: string = 'all';
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      announcements => {
        this.announcements = announcements;
        this.filterAnnouncements();
      },
      error => this.errorMessage = 'Failed to load announcements'
    );
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
    if (!announcement.read) {
      this.announcementService.markAsRead(announcement.id).subscribe(
        () => {
          announcement.read = true;
        },
        error => this.errorMessage = 'Failed to mark announcement as read'
      );
    }
  }
  getBadgeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'academic': return 'academic';
      case 'event': return 'event';
      case 'important': return 'important';
      default: return 'general';
    }
  }
}