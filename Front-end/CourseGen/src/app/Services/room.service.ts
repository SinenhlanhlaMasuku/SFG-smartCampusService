import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {

   private apiUrl = '/api/labs'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getLabs(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  // Add methods for fetching single lab, updating availability, etc.
}
