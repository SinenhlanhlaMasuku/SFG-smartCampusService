import { Component, HostListener, OnInit } from '@angular/core';
import { UserManagementService } from '../../../Services/user-management.service';
import { PendingDTO } from '../../dtos/pending-dto.model';
import { PendingUser } from '../../../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
isCollapsed = true;
  isLoading: boolean = false;
  loadingMessage: string = '';
  pendingUsers: PendingUser[] = [];

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  loadPendingUsers(): void {
    this.userManagementService.getPendingUsers().subscribe({
      next: (users) => {
        this.pendingUsers = users;
      },
      error: (error) => {
        console.error("Error fetching pending users:", error);
      }
    });
  }
  

   approveUser(userId: number): void {
    this.userManagementService.approveUser(userId).subscribe({
      next: () => {
        this.showLoading('User approved successfully!', true);
      },
      error: (error) => {
        console.error("Error approving user:", error);
      }
    });
  }

  rejectUser(userId: number): void {
    this.userManagementService.rejectUser(userId).subscribe({
      next: () => {
        this.showLoading('User rejected successfully!', true);
      },
      error: (error) => {
        console.error("Error rejecting user:", error);
      }
    });
  }

  private showLoading(message: string, refreshList: boolean = false): void {
    this.isLoading = true;
    this.loadingMessage = message;
 
    setTimeout(() => {
      this.isLoading = false;
      if (refreshList) {
        this.loadPendingUsers();
      }
    }, 2000);
  }

  
  
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.sidebar') && !target.closest('.toggle-btn')) {
      this.isCollapsed = true;
    }
  }
}
