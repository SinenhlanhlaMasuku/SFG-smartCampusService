import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerTimeTableComponent } from './lecturer-time-table.component';

describe('LecturerTimeTableComponent', () => {
  let component: LecturerTimeTableComponent;
  let fixture: ComponentFixture<LecturerTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerTimeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
