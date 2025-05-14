import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:8080/api/announcements';

  constructor(private http: HttpClient) { }

  // Existing student methods...

  getLecturerAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/lecturer`);
  }

  createAnnouncement(formData: FormData): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, formData);
  }

  updateAnnouncement(id: string, formData: FormData): Observable<Announcement> {
    return this.http.put<Announcement>(`${this.apiUrl}/${id}`, formData);
  }

  deleteAnnouncement(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}