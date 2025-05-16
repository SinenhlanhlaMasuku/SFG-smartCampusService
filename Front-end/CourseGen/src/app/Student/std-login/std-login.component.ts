import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerLoginService } from '../../Services/trainer-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-std-login',
  templateUrl: './std-login.component.html',
  styleUrl: './std-login.component.css'
})
export class StdLoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{9}@tut4life\.ac\.za$/)

      ]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.studentService.loginStudent(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/std-dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}