import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerLoginService } from '../../Services/trainer-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-std-login',
  templateUrl: './std-login.component.html',
  styleUrl: './std-login.component.css'
})
export class StdLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router, 
    private loginService: TrainerLoginService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[0-9]+@tut4life\.ac\.za$/)]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this.loginService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}