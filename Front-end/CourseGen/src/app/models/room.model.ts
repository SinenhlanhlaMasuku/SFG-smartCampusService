export interface Room {
    id: string;
    name: string;
    capacity: number;
    facilities: string[];
    building: string;
    floor: number;
  }
  
  export interface Booking {
    id?: string;
    roomId: string;
    roomName: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }