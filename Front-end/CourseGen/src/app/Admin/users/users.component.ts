import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  selectedUser: User | null = null;
  isAddingUser: boolean = false;
  newUser: User = { id: 0, username: '', email: '', role: 'user' }; // Initialize new user object

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  openAddUserModal(): void {
    this.isAddingUser = true;
    this.newUser = { id: 0, username: '', email: '', role: 'user' }; // Reset new user form
  }

  closeAddUserModal(): void {
    this.isAddingUser = false;
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        this.loadUsers(); // Reload user list
        this.closeAddUserModal();
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = { ...user }; // Create a copy to avoid direct modification
  }

  cancelEdit(): void {
    this.selectedUser = null;
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.loadUsers(); // Reload user list
          this.selectedUser = null;
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
      }
    }

}
