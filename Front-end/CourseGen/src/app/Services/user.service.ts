import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PendingUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
getPendingUsers(): Observable<PendingUser[]> {
    return this.http.get<PendingUser[]>(`${this.apiUrl}/pending`);
  }

  approveUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${userId}`, {});
  }

  rejectUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject/${userId}`, {});
  }
  // Add methods for fetching single user
}