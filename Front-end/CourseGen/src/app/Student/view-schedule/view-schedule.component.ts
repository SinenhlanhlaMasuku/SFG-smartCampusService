import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../Services/view-schedule.service';
import { CourseSchedule } from '../../models/schedule.mode';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {
          isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  schedule: CourseSchedule[] = [];
  selectedDay: string = 'Monday';
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  errorMessage: string = '';

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.scheduleService.getStudentSchedule().subscribe(
      schedule => this.schedule = schedule,
      error => this.errorMessage = 'Failed to load schedule'
    );
  }

  getDaySchedule(day: string): CourseSchedule[] {
    return this.schedule.filter(item => item.day === day);
  }

  hasClassAt(day: string, time: string): boolean {
    return this.schedule.some(item => 
      item.day === day && 
      this.isTimeBetween(time, item.startTime, item.endTime)
    );
  }
  
  getClassesAt(day: string, time: string): CourseSchedule[] {
    return this.schedule.filter(item => 
      item.day === day && 
      this.isTimeBetween(time, item.startTime, item.endTime)
    );
  }
  
  private isTimeBetween(time: string, start: string, end: string): boolean {
    const timeValue = this.timeToValue(time);
    const startValue = this.timeToValue(start);
    const endValue = this.timeToValue(end);
    return timeValue >= startValue && timeValue < endValue;
  }
  
  private timeToValue(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}