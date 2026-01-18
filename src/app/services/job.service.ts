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
        return this.http.post<Job>(this.apiUrl, job);
    }

    getJobsByCompany(companyId: number): Observable<Job[]> {
        return this.http.get<Job[]>(`${this.apiUrl}?companyId=${companyId}`);
    }
}
