import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobService } from '../../services/job.service';
import { ApplicantService } from '../../services/applicant.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-posted-jobs',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  styles: [`
    .job-grid-dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
      padding: 1rem;
    }
    .job-card-dashboard {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: box-shadow 0.2s;
      border: 1px solid #e2e8f0;
    }
    .job-card-dashboard:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.14); }
    .card-header h3 { margin: 0 0 0.25rem; font-size: 1rem; color: #1e40af; cursor: pointer; }
    .card-header h3:hover { text-decoration: underline; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin-bottom: 0.75rem; }
    .card-stats {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: #64748b;
      margin-bottom: 0.85rem;
      padding: 0.5rem 0.75rem;
      background: #f8fafc;
      border-radius: 6px;
    }
    .card-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f5f9;
      padding-top: 0.75rem;
    }
    .applicant-count {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.83rem;
      font-weight: 600;
      color: #2563eb;
      padding: 0.2rem 0.6rem;
      background: #eff6ff;
      border-radius: 20px;
    }
    .applicant-count mat-icon { font-size: 15px; width: 15px; height: 15px; }
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem;
      gap: 1rem;
      color: #64748b;
    }
    .empty-state {
      text-align: center;
      padding: 4rem;
      color: #94a3b8;
    }
    .empty-state mat-icon { font-size: 64px; width: 64px; height: 64px; display: block; margin: 0 auto 1rem; }
  `],
  template: `
    <!-- Loading -->
    <div class="loading-state" *ngIf="isLoading">
      <mat-spinner diameter="40"></mat-spinner>
      <p>Loading your job postings...</p>
    </div>

    <!-- Empty State -->
    <div class="empty-state" *ngIf="!isLoading && jobs.length === 0">
      <mat-icon>work_off</mat-icon>
      <p>No jobs posted yet. Click <strong>"POST NEW JOB"</strong> above to get started.</p>
    </div>

    <!-- Job Cards -->
    <div class="job-grid-dashboard" *ngIf="!isLoading && jobs.length > 0">
      <div class="job-card-dashboard" *ngFor="let job of jobs">
        <div class="card-header">
          <h3 (click)="goToJobDetail(job.id)">{{ job.title }}</h3>
          <div class="subtitle">{{ job.location }} &bull; {{ job.type }}</div>
        </div>
        <div class="card-stats">
          <span>📅 {{ job.postedDate | date:'dd MMM yyyy' }}</span>
          <span>💰 {{ job.salary | currency:'INR':'symbol':'1.0-0' }}</span>
        </div>
        <div class="card-actions">
          <span class="applicant-count">
            <mat-icon>people</mat-icon>
            {{ getApplicantCount(job.id) }} Applicant(s)
          </span>
          <button mat-flat-button color="primary" (click)="viewCandidates(job.id)">
            <mat-icon>people_alt</mat-icon> View Candidates
          </button>
        </div>
      </div>
    </div>
  `
})
export class PostedJobs implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  applicantCounts: { [jobId: number]: number } = {};

  constructor(
    private jobService: JobService,
    private applicantService: ApplicantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Use the SIMPLE method (no _embed) to avoid json-server issues
    this.jobService.getJobsByCompanySimple(1).subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
        this.loadApplicantCounts();
      },
      error: (err) => {
        console.error('Failed to load jobs:', err);
        this.isLoading = false;
      }
    });
  }

  loadApplicantCounts(): void {
    this.jobs.forEach(job => {
      this.applicantService.getApplicationsByJob(job.id).subscribe({
        next: (apps) => { this.applicantCounts[job.id] = apps.length; },
        error: () => { this.applicantCounts[job.id] = 0; }
      });
    });
  }

  getApplicantCount(jobId: number): number {
    return this.applicantCounts[jobId] ?? 0;
  }

  viewCandidates(jobId: number): void {
    this.router.navigate(['/dashboard/applications', jobId]);
  }

  goToJobDetail(jobId: number): void {
    this.router.navigate(['/jobs', jobId]);
  }
}
