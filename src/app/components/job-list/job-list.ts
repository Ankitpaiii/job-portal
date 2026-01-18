import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.scss']
})
export class JobList implements OnInit {
  jobs: Job[] = [];
  
  // Filter States
  searchTitle: string = '';
  filterLocation: string = '';
  filterType: string = '';

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (e) => console.error(e)
    });
  }

  get filteredJobs(): Job[] {
    return this.jobs.filter(job => {
      const matchTitle = job.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchLocation = this.filterLocation ? job.location === this.filterLocation : true;
      const matchType = this.filterType ? job.type === this.filterType : true;
      return matchTitle && matchLocation && matchType;
    });
  }

  get uniqueLocations(): string[] {
    return [...new Set(this.jobs.map(j => j.location))];
  }

  get uniqueTypes(): string[] {
    return [...new Set(this.jobs.map(j => j.type))];
  }

  clearFilters() {
    this.searchTitle = '';
    this.filterLocation = '';
    this.filterType = '';
  }
}
