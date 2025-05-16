import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:8080/api/announcements';

  constructor(private http: HttpClient) { }

  // Existing student methods...

  getLecturerAnnouncements(lecturerId: string): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/lecturer/${lecturerId}`);
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

  searchAnnouncements(query: string, filter: string): Observable<Announcement[]> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    if (filter && filter !== 'all') {
      params = params.set('type', filter);
    }

    return this.http.get<Announcement[]>(`${this.apiUrl}/search`, { params });
  }
}