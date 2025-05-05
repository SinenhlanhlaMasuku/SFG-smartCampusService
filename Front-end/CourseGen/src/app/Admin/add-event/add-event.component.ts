import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../Services/event.service';
import { Event } from '../../Services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  courses = ['Math', 'Science', 'History', 'Literature', 'Art'];
  categories = ['Lecture', 'Exam', 'Assignment', 'Meeting', 'Personal'];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      course: [''],
      category: ['']
    });
  }

  public navigateToCalendar(): void {
    this.router.navigate(['/calendar']);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent: Event = {
        ...this.eventForm.value,
        startDateTime: new Date(this.eventForm.value.startDateTime),
        endDateTime: new Date(this.eventForm.value.endDateTime)
      };

      this.eventService.addEvent(newEvent).subscribe({
        next: () => {
          this.router.navigate(['/calendar']);
        },
        error: (err) => {
          console.error('Error adding event:', err);
        }
      });
    }
  }
}
