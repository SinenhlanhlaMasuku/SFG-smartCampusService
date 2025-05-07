import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../Services/schedule.service';
import { LecturerSchedule } from '../../models/lecturer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {
getClassesAt(_t119: string,_t114: string): any {
throw new Error('Method not implemented.');
}
hasClassAt(_t119: string,_t114: string) {
throw new Error('Method not implemented.');
}
  schedules: LecturerSchedule[] = [];
  filteredSchedules: LecturerSchedule[] = [];
  selectedDay: string = 'Monday';
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  scheduleForm: FormGroup;
  isEditing: boolean = false;
  currentScheduleId: string | undefined;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {
    this.scheduleForm = this.fb.group({
      courseCode: ['', Validators.required],
      courseName: ['', Validators.required],
      day: ['Monday', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      officeHours: ['']
    });
  }

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.getLecturerSchedules().subscribe(
      schedules => {
        this.schedules = schedules;
        this.filterSchedules();
      },
      error => this.errorMessage = 'Failed to load schedules'
    );
  }

  filterSchedules(): void {
    this.filteredSchedules = this.schedules.filter(schedule => schedule.day === this.selectedDay);
  }

  onDayChange(day: string): void {
    this.selectedDay = day;
    this.filterSchedules();
  }

  onSubmit(): void {
    if (this.scheduleForm.invalid) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    const scheduleData: LecturerSchedule = this.scheduleForm.value;

    if (this.isEditing && this.currentScheduleId) {
      this.scheduleService.updateSchedule(this.currentScheduleId, scheduleData).subscribe(
        () => {
          this.loadSchedules();
          this.resetForm();
          this.successMessage = 'Schedule updated successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => this.errorMessage = 'Failed to update schedule'
      );
    } else {
      this.scheduleService.addSchedule(scheduleData).subscribe(
        () => {
          this.loadSchedules();
          this.resetForm();
          this.successMessage = 'Schedule added successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => this.errorMessage = 'Failed to add schedule'
      );
    }
  }

  editSchedule(schedule: LecturerSchedule): void {
    this.isEditing = true;
    this.currentScheduleId = schedule.id;
    this.scheduleForm.patchValue({
      courseCode: schedule.courseCode,
      courseName: schedule.courseName,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      location: schedule.location,
      officeHours: schedule.officeHours || ''
    });
  }

  deleteSchedule(scheduleId: string): void {
    if (confirm('Are you sure you want to delete this schedule?')) {
      this.scheduleService.deleteSchedule(scheduleId).subscribe(
        () => {
          this.loadSchedules();
          this.successMessage = 'Schedule deleted successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error => this.errorMessage = 'Failed to delete schedule'
      );
    }
  }

  resetForm(): void {
    this.scheduleForm.reset({
      day: 'Monday',
      officeHours: ''
    });
    this.isEditing = false;
    this.currentScheduleId = undefined;
    this.errorMessage = '';
  }

  getDaySchedule(day: string): LecturerSchedule[] {
    return this.schedules.filter(item => item.day === day);
  }
}