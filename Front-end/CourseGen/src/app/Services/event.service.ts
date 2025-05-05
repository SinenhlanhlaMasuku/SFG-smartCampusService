import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Event } from './event.model';

// event.model.ts
export interface Event {
  id?: number;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  course: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) { }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventsByDateRange(start: Date, end: Date): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/range?start=${start.toISOString()}&end=${end.toISOString()}`);
  }

  getEventsByCourse(course: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/course/${course}`);
  }

  getEventsByCategory(category: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/category/${category}`);
  }
}
