import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatAutocompleteModule,
    MatProgressSpinnerModule,
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

  // Autocomplete
  suggestedTitles: string[] = [];
  allTitles: string[] = [];

  // Hardcoded Lists as requested
  locations: string[] = [
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Mumbai',
    'Delhi NCR',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Coimbatore'
  ];

  jobTypes: string[] = [
    'Full Time',
    'Part Time',
    'Internship',
    'Contract',
    'Remote'
  ];

  filteredJobs: Job[] = [];

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        // Extract unique titles for autocomplete
        this.allTitles = [...new Set(data.map(job => job.title))];
        this.applyFilters(); // Initial filter
        this.isLoading = false;
        this.cdr.detectChanges(); // Force update
      },
      error: (e) => {
        console.error(e);
        this.errorMessage = 'Failed to load jobs. Please ensure JSON Server is running on port 3000.';
        this.isLoading = false;
        this.cdr.detectChanges(); // Force update
      }
    });
  }

  onSearchInput() {
    // Filter suggestions based on input
    if (this.searchTitle) {
      const filterValue = this.searchTitle.toLowerCase();
      this.suggestedTitles = this.allTitles.filter(title =>
        title.toLowerCase().includes(filterValue)
      );
    } else {
      this.suggestedTitles = [];
    }
  }

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job =>
      (!this.searchTitle || job.title.toLowerCase().includes(this.searchTitle.toLowerCase())) &&
      (!this.filterLocation || job.location === this.filterLocation) &&
      (!this.filterType || job.type === this.filterType)
    );
  }

  clearFilters() {
    this.searchTitle = '';
    this.filterLocation = '';
    this.filterType = '';
    this.applyFilters();
  }
}
