export interface LecturerSchedule {
    id?: string;
    courseCode: string;
    courseName: string;
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    officeHours?: string;
    studentCount?: number;
  }