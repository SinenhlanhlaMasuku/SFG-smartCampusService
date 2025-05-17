import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
  selectedDepartment = '';
  timeTables: any[] = [];
  filteredTimeTables: any[] = [];
  isLoading = false;
  isCollapsed = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // In a real app, you would fetch this from your backend
    this.timeTables = [
      {
        id: 1,
        department: 'Computer Science',
        semester: 'First Semester 2023',
        subjects: [
          { name: 'Data Structures', day: 'Monday', time: '9:00 AM - 11:00 AM', room: 'CS-101' },
          { name: 'Algorithms', day: 'Tuesday', time: '11:00 AM - 1:00 PM', room: 'CS-102' },
          { name: 'Database Systems', day: 'Wednesday', time: '2:00 PM - 4:00 PM', room: 'CS-103' }
        ],
        startDate: '2023-09-01',
        endDate: '2023-12-15'
      },
      {
        id: 2,
        department: 'Electrical Engineering',
        semester: 'First Semester 2023',
        subjects: [
          { name: 'Circuit Theory', day: 'Monday', time: '8:00 AM - 10:00 AM', room: 'EE-201' },
          { name: 'Electronics', day: 'Wednesday', time: '10:00 AM - 12:00 PM', room: 'EE-202' }
        ],
        startDate: '2023-09-01',
        endDate: '2023-12-15'
      }
    ];
    this.filteredTimeTables = [...this.timeTables];
  }

  filterByDepartment(): void {
    if (!this.selectedDepartment) {
      this.filteredTimeTables = [...this.timeTables];
    } else {
      this.filteredTimeTables = this.timeTables.filter(
        tt => tt.department === this.selectedDepartment
      );
    }
  }

  downloadTimeTable(timeTable: any): void {
    this.isLoading = true;
    
    // Create CSV content
    let csvContent = `Department,${timeTable.department}\n`;
    csvContent += `Semester,${timeTable.semester}\n`;
    csvContent += `Start Date,${timeTable.startDate}\n`;
    csvContent += `End Date,${timeTable.endDate}\n\n`;
    csvContent += 'Subject,Day,Time,Room\n';
    
    timeTable.subjects.forEach((subject: any) => {
      csvContent += `${subject.name},${subject.day},${subject.time},${subject.room}\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${timeTable.department}_TimeTable_${timeTable.semester}.csv`);
    
    this.isLoading = false;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}