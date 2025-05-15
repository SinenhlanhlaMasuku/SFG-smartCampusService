export type AnnouncementType = 'Academic' | 'Event' | 'Important' | 'General';

export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    type: AnnouncementType;
    read: boolean;
    attachment?: {
        name: string;
        url: string;
    };
    courses?: string[];
    targetGroups?: string[];
}