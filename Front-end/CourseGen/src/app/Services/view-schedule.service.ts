import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseSchedule } from '../models/schedule.mode';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'api/schedule';

  constructor(private http: HttpClient) { }

  getStudentSchedule(): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.apiUrl}/student`);
  }
}