import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'api/announcements';

  constructor(private http: HttpClient) { }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }

  markAsRead(announcementId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${announcementId}/read`, {});
  }
}