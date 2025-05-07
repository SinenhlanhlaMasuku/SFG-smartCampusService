import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { Booking } from '../models/booking.model'; //it is for booking model

@Injectable({
  providedIn: 'root'
})
export class RoomBookingService {
  private apiUrl = 'api/room-booking';

  constructor(private http: HttpClient) { }

  getAvailableRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/my-bookings`);
  }

  bookRoom(booking: Booking): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, booking);
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${bookingId}`);
  }
}