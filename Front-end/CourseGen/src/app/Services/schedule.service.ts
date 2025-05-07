import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LecturerSchedule } from '../models/lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'api/schedule';

  constructor(private http: HttpClient) { }

  // Existing student methods...

  getLecturerSchedules(): Observable<LecturerSchedule[]> {
    return this.http.get<LecturerSchedule[]>(`${this.apiUrl}/lecturer`);
  }

  addSchedule(schedule: LecturerSchedule): Observable<LecturerSchedule> {
    return this.http.post<LecturerSchedule>(`${this.apiUrl}`, schedule);
  }

  updateSchedule(id: string, schedule: LecturerSchedule): Observable<LecturerSchedule> {
    return this.http.put<LecturerSchedule>(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}