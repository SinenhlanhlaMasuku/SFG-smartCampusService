import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { RoomBookingService } from '../../Services/book-rooms.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['view-bookings.component.css'],
})

export class ViewBookingComponent implements OnInit {

date: any;
cancelBooking(arg0: any) {
throw new Error('Method not implemented.');
}
editBooking(arg0: any) {
throw new Error('Method not implemented.');
}
  bookings: Booking[] = [];
  displayedColumns: string[] = ['id', 'labName', 'user', 'bookingDate', 'startTime', 'endTime', 'status', 'actions']; // Define columns to display

  constructor(private bookingService: RoomBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getMyBookings().subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error loading bookings:', error);
      }
    );
  }

  // Add methods for filtering, sorting, and actions (e.g., edit, cancel)
}