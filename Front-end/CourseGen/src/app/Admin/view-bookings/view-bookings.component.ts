// import { Component, OnInit } from '@angular/core';
// import { BookingService } from '../../services/booking.service';
// import { RoomBooking } from '../../models/booking.model';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-view-bookings',
//   templateUrl: './view-bookings.component.html',
//   styleUrls: ['./view-bookings.component.css'],
//   providers: [DatePipe]
// })
// export class ViewBookingsComponent implements OnInit {
//   bookings: RoomBooking[] = [];
//   filteredBookings: RoomBooking[] = [];
//   filterForm: FormGroup;
//   statusOptions = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
//   loading = false;
//   errorMessage = '';
//   today = new Date();

//   constructor(
//     private bookingService: BookingService,
//     private fb: FormBuilder,
//     private datePipe: DatePipe
//   ) {
//     this.filterForm = this.fb.group({
//       date: [''],
//       room: [''],
//       status: ['All'],
//       user: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadBookings();
//     this.filterForm.valueChanges.subscribe(() => this.applyFilters());
//   }

//   loadBookings(): void {
//     this.loading = true;
//     this.bookingService.getAllBookings().subscribe(
//       bookings => {
//         this.bookings = bookings;
//         this.filteredBookings = [...bookings];
//         this.loading = false;
//       },
//       error => {
//         this.errorMessage = 'Failed to load bookings';
//         this.loading = false;
//       }
//     );
//   }

//   applyFilters(): void {
//     const { date, room, status, user } = this.filterForm.value;
    
//     this.filteredBookings = this.bookings.filter(booking => {
//       const dateMatch = !date || booking.date === this.datePipe.transform(date, 'yyyy-MM-dd');
//       const roomMatch = !room || booking.roomName.toLowerCase().includes(room.toLowerCase());
//       const statusMatch = status === 'All' || booking.status === status;
//       const userMatch = !user || 
//         booking.userName.toLowerCase().includes(user.toLowerCase()) ||
//         booking.userEmail.toLowerCase().includes(user.toLowerCase());
      
//       return dateMatch && roomMatch && statusMatch && userMatch;
//     });
//   }

//   approveBooking(bookingId: string): void {
//     this.bookingService.updateBookingStatus(bookingId, 'Approved').subscribe(
//       () => this.loadBookings(),
//       error => this.errorMessage = 'Failed to approve booking'
//     );
//   }

//   rejectBooking(bookingId: string): void {
//     this.bookingService.updateBookingStatus(bookingId, 'Rejected').subscribe(
//       () => this.loadBookings(),
//       error => this.errorMessage = 'Failed to reject booking'
//     );
//   }

//   resetFilters(): void {
//     this.filterForm.reset({
//       status: 'All'
//     });
//   }
// }