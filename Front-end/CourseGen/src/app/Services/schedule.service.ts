import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseSchedule } from '../models/schedule.mode';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8080/api/schedules';

  constructor(private http: HttpClient) { }

  getAllSchedules(): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(this.apiUrl);
  }

  getScheduleById(id: number): Observable<CourseSchedule> {
    return this.http.get<CourseSchedule>(`${this.apiUrl}/${id}`);
  }

  createSchedule(schedule: CourseSchedule): Observable<CourseSchedule> {
    return this.http.post<CourseSchedule>(this.apiUrl, schedule);
  }

  updateSchedule(id: number, schedule: CourseSchedule): Observable<CourseSchedule> {
    return this.http.put<CourseSchedule>(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSchedulesByCourseCode(courseCode: string): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.apiUrl}/course/${courseCode}`);
  }

  getSchedulesByInstructor(instructor: string): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.apiUrl}/instructor/${instructor}`);
  }

  getSchedulesByDay(day: string): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.apiUrl}/day/${day}`);
  }
}