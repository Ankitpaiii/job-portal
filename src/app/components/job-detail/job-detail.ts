import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatIconModule, MatDividerModule],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.scss']
})
export class JobDetail implements OnInit {
  job: Job | undefined;
  isLoading = true;
  errorMessage = '';
  debugId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('JobDetail initialized');
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = Number(idStr);
      this.debugId = id;

      this.isLoading = true;
      this.errorMessage = '';
      this.job = undefined;
      this.cdr.detectChanges();

      if (id) {
        this.loadJob(id);
      } else {
        console.error('JobDetail: Invalid ID in route');
        this.errorMessage = 'Invalid Job ID';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadJob(id: number) {
    console.log('JobDetail: Loading job', id);
    this.jobService.getJobById(id)
      .pipe(
        finalize(() => {
          console.log('JobDetail: Observable finalized');
        })
      )
      .subscribe({
        next: (data) => {
          console.log('JobDetail: Success', data);
          if (data) {
            this.job = data;
            this.isLoading = false;

            // Increment View Count
            this.jobService.incrementJobView(data).subscribe({
              next: () => console.log('View count incremented'),
              error: (e) => console.error('Failed to increment view count', e)
            });

          } else {
            this.errorMessage = 'Job not found (null data)';
            this.isLoading = false;
          }
          this.cdr.detectChanges();
        },
        error: (e) => {
          console.error('JobDetail: Error', e);
          this.errorMessage = `Failed to load job details. Error: ${e.message || e.statusText || 'Unknown error'}`;
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }
}
