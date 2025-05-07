export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    type: 'Academic' | 'Event' | 'Important' | 'General';
    read: boolean;
    attachment?: {
      name: string;
      url: string;
    };
      // For lecturer view only
  courses?: string[];
  targetGroups?: string[];
}
