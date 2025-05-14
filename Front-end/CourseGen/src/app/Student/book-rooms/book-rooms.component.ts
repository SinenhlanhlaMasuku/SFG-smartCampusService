import { Component, OnInit } from '@angular/core';
import { RoomBookingService } from '../../Services/book-rooms.service';
import { Room } from '../../models/room.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-book-rooms',
  templateUrl: './book-rooms.component.html',
  styleUrls: ['./book-rooms.component.css']
})
export class BookRoomsComponent implements OnInit {
      isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  availableRooms: Room[] = [];
  selectedRoom: Room | null = null;
  user: string = '';
  bookingDate: string = '';
  startTime: string = '';
  endTime: string = '';
  purpose: string = '';
  bookings: Booking[] = [];
  errorMessage: string = '';

  constructor(private roomBookingService: RoomBookingService) { }

  ngOnInit(): void {
    this.loadAvailableRooms();
    this.loadMyBookings();
  }

  loadAvailableRooms(): void {
    this.roomBookingService.getAvailableRooms().subscribe(
      rooms => this.availableRooms = rooms,
      error => this.errorMessage = 'Failed to load available rooms'
    );
  }

  loadMyBookings(): void {
    this.roomBookingService.getMyBookings().subscribe(
      bookings => this.bookings = bookings,
      error => this.errorMessage = 'Failed to load your bookings'
    );
  }

  selectRoom(room: Room): void {
    this.selectedRoom = room;
  }

  bookRoom(): void {
    if (!this.selectedRoom || !this.bookingDate || !this.startTime || !this.endTime) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    const booking: Booking = {
      roomId: this.selectedRoom.id,
      // user: this.
      roomName: this.selectedRoom.name,
      date: this.bookingDate,
      startTime: this.startTime,
      endTime: this.endTime,
      purpose: this.purpose,
      status: 'Pending',
      user: ''
    };

    this.roomBookingService.bookRoom(booking).subscribe(
      () => {
        this.loadMyBookings();
        this.resetForm();
      },
      error => this.errorMessage = 'Failed to book room'
    );
  }

  cancelBooking(bookingId: string): void {
    this.roomBookingService.cancelBooking(bookingId).subscribe(
      () => this.loadMyBookings(),
      error => this.errorMessage = 'Failed to cancel booking'
    );
  }

  private resetForm(): void {
    this.selectedRoom = null;
    this.bookingDate = '';
    this.startTime = '';
    this.endTime = '';
    this.purpose = '';
    this.errorMessage = '';
  }
}