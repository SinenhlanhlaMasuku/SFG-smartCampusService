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