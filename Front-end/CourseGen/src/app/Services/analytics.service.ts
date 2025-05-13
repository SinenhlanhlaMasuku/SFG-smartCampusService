import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabUsageData, BookingTrendData } from '../models/analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = '/api/analytics'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getLabUsage(): Observable<LabUsageData[]> {
    return this.http.get<LabUsageData[]>(`${this.apiUrl}/lab-usage`);
  }

  getBookingTrends(): Observable<BookingTrendData[]> {
    return this.http.get<BookingTrendData[]>(`${this.apiUrl}/booking-trends`);
  }

  // Add methods for other analytics data
}