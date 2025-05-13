export interface Booking {
    id?: string;
    roomId: string;
    user: string;
    roomName: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }