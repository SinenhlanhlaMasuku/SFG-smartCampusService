export interface CourseSchedule {
    courseCode: string;
    courseName: string;
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    instructor: string;
    officeHours?: string;
    currentScheduleId?: number;
    
  }