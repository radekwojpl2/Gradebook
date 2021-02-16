export default function submitAnnouncementForm(): {
    type: string;
    name: string;
    title: string;
    message: string;
    date: string;
    timestamp: number;
} | {
    type: string;
    name: string;
    title: string;
    message: string;
    timestamp: number;
    date?: undefined;
};
