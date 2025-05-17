import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-lecturer-time-table',
  templateUrl: './lecturer-time-table.component.html',
  styleUrls: ['./lecturer-time-table.component.css']
})
export class LecturerTimeTableComponent implements OnInit {
  departments = ['Computer Science', 'Electrical Engineering', 'Mechanical', 'Civil'];
  selectedDepartment = '';
  timeTables: any[] = [];
  filteredTimeTables: any[] = [];
  lecturerSubjects: string[] = [];
  isLoading = false;
  isCollapsed = true;
  shareLink = '';
  currentLecturer: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentLecturer = this.authService.getCurrentUser();
    this.loadTimeTables();
    this.loadLecturerSubjects();
  }

  loadTimeTables(): void {
    this.isLoading = true;
    // Mock data - replace with actual API call
    setTimeout(() => {
      this.timeTables = [
        {
          id: 1,
          department: 'Computer Science',
          semester: 'First Semester 2023',
          subjects: [
            { name: 'Data Structures', lecturer: 'Dr. Smith', day: 'Monday', time: '9:00-11:00', room: 'CS-101' },
            { name: 'Algorithms', lecturer: 'Dr. Johnson', day: 'Tuesday', time: '11:00-13:00', room: 'CS-102' },
            { name: this.lecturerSubjects[0], lecturer: this.currentLecturer.name, day: 'Wednesday', time: '14:00-16:00', room: 'CS-103' }
          ],
          startDate: '2023-09-01',
          endDate: '2023-12-15'
        },
        {
          id: 2,
          department: 'Electrical Engineering',
          semester: 'First Semester 2023',
          subjects: [
            { name: 'Circuit Theory', lecturer: 'Prof. Brown', day: 'Monday', time: '8:00-10:00', room: 'EE-201' },
            { name: this.lecturerSubjects[1], lecturer: this.currentLecturer.name, day: 'Wednesday', time: '10:00-12:00', room: 'EE-202' }
          ],
          startDate: '2023-09-01',
          endDate: '2023-12-15'
        }
      ];
      this.filteredTimeTables = [...this.timeTables];
      this.isLoading = false;
    }, 1000);
  }

  loadLecturerSubjects(): void {
    // Mock data - replace with API call to get lecturer's subjects
    this.lecturerSubjects = ['Database Systems', 'Electronics'];
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

  filterMySubjects(): void {
    this.filteredTimeTables = this.timeTables.map(tt => ({
      ...tt,
      subjects: tt.subjects.filter((subj: any) => 
        this.lecturerSubjects.includes(subj.name)
      )
    })).filter(tt => tt.subjects.length > 0);
  }

  downloadTimeTable(timeTable: any): void {
    const csvContent = this.generateCsvContent(timeTable);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${timeTable.department}_Timetable_${timeTable.semester}.csv`);
  }

  generateCsvContent(timeTable: any): string {
    let csv = `Department,${timeTable.department}\n`;
    csv += `Semester,${timeTable.semester}\n`;
    csv += `Period,${timeTable.startDate} to ${timeTable.endDate}\n\n`;
    csv += 'Subject,Lecturer,Day,Time,Room\n';
    
    timeTable.subjects.forEach((subj: any) => {
      csv += `${subj.name},${subj.lecturer},${subj.day},${subj.time},${subj.room}\n`;
    });
    
    return csv;
  }

  generateShareLink(timeTable: any): void {
    // In a real app, this would generate a unique URL from your backend
    this.shareLink = `${window.location.origin}/shared-timetable/${timeTable.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(this.shareLink).then(() => {
      alert('Share link copied to clipboard!');
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}