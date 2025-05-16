import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, BehaviorSubject, Observable, of, tap } from 'rxjs';
import { PendingDTO } from '../Admin/dtos/pending-dto.model';
import { TrainerDTO } from '../Admin/dtos/TrainerDTO';
import { PendingUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiUrl = 'http://localhost:8080/Admin';

  private pendingTrainersSubject = new BehaviorSubject<PendingDTO[]>([]);
  pendingTrainers$ = this.pendingTrainersSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  getPendingUsers(): Observable<PendingUser[]> {
    return this.http.get<PendingUser[]>(`${this.apiUrl}/pending`);
  }

  approveUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${userId}`, {});
  }

  rejectUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject/${userId}`, {});
  }
  
}
