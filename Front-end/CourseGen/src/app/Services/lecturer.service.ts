import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LecturerRegistration {
  email: string;
  password: string;
  fullName: string;
  staffId: string;
  department: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiUrl = 'http://localhost:8080/api/auth/lecturer';

  constructor(private http: HttpClient) { }

  registerLecturer(lecturer: LecturerRegistration): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, lecturer);
  }

  loginLecturer(credentials: {email: string, password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }
}