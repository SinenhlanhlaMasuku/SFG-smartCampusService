import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../Services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
@Component({
  selector: 'app-std-register',
  templateUrl: './std-register.component.html',
  styleUrl: './std-register.component.css'
})
export class StdRegisterComponent {
 registerForm: FormGroup;
  registrationSuccess = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]+@tut4life\.ac\.za$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const student = {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.studentService.registerStudent(student).subscribe({
      next: () => {
        this.registrationSuccess = true;
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/std-login']);
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
