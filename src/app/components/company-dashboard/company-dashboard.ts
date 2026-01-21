import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';
import { ApplicantService } from '../../services/applicant.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './company-dashboard.html',
  styleUrls: ['./company-dashboard.scss']
})
export class CompanyDashboard implements OnInit {
  jobs: Job[] = [];
  displayedColumns: string[] = ['name', 'email', 'date', 'status', 'actions'];

  // Tab Control
  selectedTabIndex = 0;
  selectedJobId: number | null = null;
  selectedJobTitle: string = '';
  selectedJobApplications: Application[] = [];

  // Stats
  totalJobs = 0;
  totalApplicants = 0;
  totalViews = 0;

  constructor(
    private jobService: JobService,
    private applicantService: ApplicantService
  ) { }

  ngOnInit(): void {
    // Mock Company ID 1
    this.jobService.getJobsByCompany(1).subscribe({
      next: (data) => {
        this.jobs = data;
        this.calculateStats();
      },
      error: (e) => console.error(e)
    });
  }

  calculateStats() {
    this.totalJobs = this.jobs.length;

    // Real-time calculations
    this.totalApplicants = this.jobs.reduce((acc, job) => acc + (job.applications ? job.applications.length : 0), 0);
    this.totalViews = this.jobs.reduce((acc, job) => acc + (job.views || 0), 0);
  }

  viewCandidates(jobId: number) {
    const job = this.jobs.find(j => j.id === jobId);
    if (job) {
      this.selectedJobId = jobId;
      this.selectedJobTitle = job.title;
      this.selectedTabIndex = 1; // Switch to "Recent Applications" tab
      console.log(`Viewing candidates for job: ${job.title} (${jobId})`);

      this.applicantService.getApplicationsByJob(jobId).subscribe({
        next: (apps) => {
          this.selectedJobApplications = apps;
          console.log('Fetched applications:', apps);
        },
        error: (e) => console.error('Error fetching applications:', e)
      });
    }
  }
}
