import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../Services/announcement.service';
import { Announcement, AnnouncementType } from '../../models/announcement.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-manage-announcements',
  templateUrl: './manage-announcements.component.html',
  styleUrls: ['./manage-announcements.component.css']
})
export class ManageAnnouncementsComponent implements OnInit {
  isCollapsed = true;
  isLoading: boolean = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
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
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.maxLength(2000)]],
      type: ['General' as AnnouncementType, Validators.required], // Explicit type casting
      attachmentName: ['']
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
  const currentUser = this.authService.getCurrentUser();
  if (!currentUser) {
    this.errorMessage = 'Not authenticated';
    return;
  }

  this.isLoading = true;
  this.announcementService.getLecturerAnnouncements(currentUser.id).subscribe({
    next: (announcements) => {
      this.announcements = announcements;
      this.filterAnnouncements();
      this.isLoading = false;
    },
    error: (error) => {
      this.errorMessage = 'Failed to load announcements';
      this.isLoading = false;
      console.error(error);
    }
  });
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
    formData.append('title', this.announcementForm.value.title!);
    formData.append('content', this.announcementForm.value.content!);
    formData.append('type', this.announcementForm.value.type!);
    formData.append('author', 'current-user-id'); // Replace with actual user ID

    if (this.announcementForm.value.courses) {
      formData.append('courses', JSON.stringify(this.announcementForm.value.courses));
    }

    if (this.announcementForm.value.targetGroups) {
      formData.append('targetGroups', JSON.stringify(this.announcementForm.value.targetGroups));
    }

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
        error => {
          this.errorMessage = 'Failed to update announcement';
          console.error(error);
        }
      );
    } else {
      this.announcementService.createAnnouncement(formData).subscribe(
        () => {
          this.loadAnnouncements();
          this.resetForm();
          this.successMessage = 'Announcement created successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => {
          this.errorMessage = 'Failed to create announcement';
          console.error(error);
        }
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