import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../Services/announcement.service';
import { Announcement } from '../../models/announcement.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-announcements',
  templateUrl: './manage-announcements.component.html',
  styleUrls: ['./manage-announcements.component.css']
})
export class ManageAnnouncementsComponent implements OnInit {
getBadgeClass(arg0: string) {
throw new Error('Method not implemented.');
}
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  announcementForm: FormGroup;
  isEditing: boolean = false;
  currentAnnouncementId: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  searchQuery: string = '';
  selectedFilter: string = 'all';
  attachmentFile: File | null = null;

  constructor(
    private announcementService: AnnouncementService,
    private fb: FormBuilder
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      type: ['General', Validators.required],
      attachmentName: ['']
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getLecturerAnnouncements().subscribe(
      announcements => {
        this.announcements = announcements;
        this.filterAnnouncements();
      },
      error => this.errorMessage = 'Failed to load announcements'
    );
  }

  filterAnnouncements(): void {
    this.filteredAnnouncements = this.announcements.filter(announcement => {
      const typeMatch = this.selectedFilter === 'all' || 
                       announcement.type.toLowerCase() === this.selectedFilter.toLowerCase();
      const searchMatch = !this.searchQuery || 
                         announcement.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                         announcement.content.toLowerCase().includes(this.searchQuery.toLowerCase());
      return typeMatch && searchMatch;
    });
  }

  onFileSelected(event: any): void {
    this.attachmentFile = event.target.files[0];
    if (this.attachmentFile) {
      this.announcementForm.patchValue({
        attachmentName: this.attachmentFile.name
      });
    }
  }

  onSubmit(): void {
    if (this.announcementForm.invalid) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    const formData = new FormData();
    const announcementData = this.announcementForm.value;

    Object.keys(announcementData).forEach(key => {
      if (announcementData[key] !== null && announcementData[key] !== undefined) {
        formData.append(key, announcementData[key]);
      }
    });

    if (this.attachmentFile) {
      formData.append('attachment', this.attachmentFile);
    }

    if (this.isEditing && this.currentAnnouncementId) {
      this.announcementService.updateAnnouncement(this.currentAnnouncementId, formData).subscribe(
        () => {
          this.loadAnnouncements();
          this.resetForm();
          this.successMessage = 'Announcement updated successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => this.errorMessage = 'Failed to update announcement'
      );
    } else {
      this.announcementService.createAnnouncement(formData).subscribe(
        () => {
          this.loadAnnouncements();
          this.resetForm();
          this.successMessage = 'Announcement created successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => this.errorMessage = 'Failed to create announcement'
      );
    }
  }

  editAnnouncement(announcement: Announcement): void {
    this.isEditing = true;
    this.currentAnnouncementId = announcement.id;
    this.announcementForm.patchValue({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      attachmentName: announcement.attachment?.name || ''
    });
  }

  deleteAnnouncement(announcementId: string): void {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.announcementService.deleteAnnouncement(announcementId).subscribe(
        () => {
          this.loadAnnouncements();
          this.successMessage = 'Announcement deleted successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => this.errorMessage = 'Failed to delete announcement'
      );
    }
  }

  resetForm(): void {
    this.announcementForm.reset({
      type: 'General',
      attachmentName: ''
    });
    this.isEditing = false;
    this.currentAnnouncementId = null;
    this.attachmentFile = null;
    this.errorMessage = '';
    const fileInput = document.getElementById('attachment') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}