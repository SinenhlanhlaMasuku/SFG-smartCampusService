import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../Services/schedule.service';
import { LecturerSchedule } from '../../models/lecturer.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CourseSchedule } from '../../models/schedule.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {
  schedules: CourseSchedule[] = [];
  currentSchedule: CourseSchedule = {
    courseCode: '',
    courseName: '',
    day: 'Monday', // Default value
    startTime: '',
    endTime: '',
    location: '',
    instructor: '',
    officeHours: ''
  };
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.isLoading = true;
    this.scheduleService.getAllSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load schedules';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.isLoading = true;
    const operation = this.isEditing 
      ? this.scheduleService.updateSchedule(this.currentSchedule.id!, this.currentSchedule)
      : this.scheduleService.createSchedule(this.currentSchedule);

    operation.subscribe({
      next: () => {
        this.loadSchedules();
        this.resetForm(form);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = this.isEditing ? 'Update failed' : 'Creation failed';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  editSchedule(schedule: CourseSchedule): void {
    this.currentSchedule = { ...schedule };
    this.isEditing = true;
  }

  deleteSchedule(id: number): void {
    if (confirm('Are you sure you want to delete this schedule?')) {
      this.isLoading = true;
      this.scheduleService.deleteSchedule(id).subscribe({
        next: () => {
          this.loadSchedules();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Deletion failed';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.currentSchedule = {
      courseCode: '',
      courseName: '',
      day: 'Monday',
      startTime: '',
      endTime: '',
      location: '',
      instructor: '',
      officeHours: ''
    };
    this.isEditing = false;
    this.errorMessage = '';
  }

  // Sidebar functionality (from your admin dashboard)
  isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}