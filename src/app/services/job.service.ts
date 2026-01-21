import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private apiUrl = 'http://localhost:3000/jobs';

    constructor(private http: HttpClient) { }

    getJobs(): Observable<Job[]> {
        return this.http.get<Job[]>(this.apiUrl);
    }

    getJobById(id: number): Observable<Job> {
        return this.http.get<Job>(`${this.apiUrl}/${id}`);
    }

    addJob(job: Job): Observable<Job> {
        // Initialize views to 0 for new jobs
        const jobWithViews = { ...job, views: 0 };
        return this.http.post<Job>(this.apiUrl, jobWithViews);
    }

    getJobsByCompany(companyId: number): Observable<Job[]> {
        // Embed applications to get real counts
        return this.http.get<Job[]>(`${this.apiUrl}?companyId=${companyId}&_embed=applications`);
    }

    incrementJobView(job: Job): Observable<Job> {
        const updatedViews = (job.views || 0) + 1;
        return this.http.patch<Job>(`${this.apiUrl}/${job.id}`, { views: updatedViews });
    }
}
