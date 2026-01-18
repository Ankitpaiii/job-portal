import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Application } from '../models/application.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    private apiUrl = 'http://localhost:3000/applicants';
    private applicationsUrl = 'http://localhost:3000/applications';

    constructor(private http: HttpClient) { }

    register(applicant: Applicant): Observable<Applicant> {
        return this.http.post<Applicant>(this.apiUrl, applicant);
    }

    login(email: string): Observable<Applicant[]> {
        return this.http.get<Applicant[]>(`${this.apiUrl}?email=${email}`);
    }

    applyJob(application: Application): Observable<Application> {
        return this.http.post<Application>(this.applicationsUrl, application);
    }

    getApplicationsByApplicant(applicantId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.applicationsUrl}?applicantId=${applicantId}`);
    }

    getApplicationsByJob(jobId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.applicationsUrl}?jobId=${jobId}`);
    }
}
