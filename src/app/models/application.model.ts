export interface Application {
    id: number;
    jobId: number;
    applicantId: number;
    applicationDate: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    name: string;
    email: string;
    phone: string;
    experience: string;
    coverLetter: string;
}
