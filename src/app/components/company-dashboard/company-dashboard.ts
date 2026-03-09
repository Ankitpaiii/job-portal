import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';

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
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './company-dashboard.html',
  styleUrls: ['./company-dashboard.scss']
})
export class CompanyDashboard implements OnInit {
  jobs: Job[] = [];

  // Stats
  totalJobs = 0;
  totalApplicants = 0;
  totalViews = 0;

  constructor(
    private jobService: JobService
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
    this.totalApplicants = this.jobs.reduce((acc, job) => acc + (job.applications ? job.applications.length : 0), 0);
    this.totalViews = this.jobs.reduce((acc, job) => acc + (job.views || 0), 0);
  }
}
