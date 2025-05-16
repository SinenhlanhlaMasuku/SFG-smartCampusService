import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'lecturer' | 'student';
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:8080/api/'; // Update with your backend URL
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_TYPE_KEY = 'user_type';
  private readonly STUDENT_TYPE = 'student';
  private readonly USER_KEY = 'currentUser';
  


  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(user => {
        // Store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  // logout(): void {
  //   // Remove user from local storage
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  //   this.router.navigate(['/login']);
  // }

  getCurrentUser(): User | null {
    return this.currentUserValue;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isLecturer(): boolean {
    return this.currentUserValue?.role === 'lecturer';
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }


  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_TYPE_KEY, this.STUDENT_TYPE);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Check if current user is a student
  isStudent(): boolean {
    return localStorage.getItem(this.USER_TYPE_KEY) === this.STUDENT_TYPE;
  }

  // Logout by clearing storage and redirecting
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_TYPE_KEY);
    this.router.navigate(['/std-login']);
  }

  // Get authorization header for HTTP requests
  getAuthHeader(): { [header: string]: string } {
    return {
      'Authorization': `Bearer ${this.getToken()}`
    };
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Admin/Adminlogin`, { email, password })
      .pipe(
        tap(response => {
          if (response.message === 'successfully') {
            // Create a user object for admin
            const adminUser: User = {
              id: 'admin', // You might want to get actual ID from backend
              username: 'Admin',
              email: email,
              role: 'admin',
              token: 'admin-auth-token' // Replace with actual token if your backend provides one
            };
            
            // Store user details
            localStorage.setItem(this.USER_KEY, JSON.stringify(adminUser));
            localStorage.setItem(this.TOKEN_KEY, 'admin-auth-token');
            localStorage.setItem(this.USER_TYPE_KEY, 'admin');
            this.currentUserSubject.next(adminUser);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Admin login error:', error);
          return throwError(() => new Error('Invalid admin credentials'));
        })
      );
  }

}