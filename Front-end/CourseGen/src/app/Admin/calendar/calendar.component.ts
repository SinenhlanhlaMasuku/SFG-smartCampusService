import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { Event } from '../../Services/event.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
   isCollapsed = true;
  isLoading: boolean = false;
  events: Event[] = [];
  currentDate = new Date();
  daysInMonth: Date[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Add days from previous month if needed
    const startingDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    this.daysInMonth = [];
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      this.daysInMonth.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
    
    // Next month days to fill the grid
    const daysNeeded = 42 - this.daysInMonth.length; // 6 weeks
    for (let i = 1; i <= daysNeeded; i++) {
      this.daysInMonth.push(new Date(year, month + 1, i));
    }
  }

  loadEvents(): void {
    const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    this.eventService.getEventsByDateRange(startDate, endDate).subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (err) => {
        console.error('Error loading events:', err);
      }
    });
  }

    
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getEventsForDay(day: Date): Event[] {
    return this.events.filter(event => {
      const eventDate = new Date(event.startDateTime);
      return eventDate.getDate() === day.getDate() && 
             eventDate.getMonth() === day.getMonth() && 
             eventDate.getFullYear() === day.getFullYear();
    });
  }

  changeMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.generateCalendar();
    this.loadEvents();
  }
}
