import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/Student'; // backend base path

  constructor(private http: HttpClient) {}

  registerStudent(student: any) {
    return this.http.post(`${this.baseUrl}/register`, student);
  }

  loginStudent(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}