import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ApplicantService } from '../../services/applicant.service';
import { Application } from '../../models/application.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recent-applications',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatProgressSpinnerModule, MatChipsModule],
  styles: [`
    .application-list { padding: 1rem; }
    .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .list-header h3 { margin: 0; font-size: 1.2rem; }
    .list-header p { margin: 0.25rem 0 0; color: #64748b; font-size: 0.9rem; }
    .mat-mdc-table { width: 100%; border-radius: 8px; overflow: hidden; }
    .status-chip-pending { background: #fff3e0; color: #e65100; font-weight: 600; font-size: 0.75rem; }
    .status-chip-reviewed { background: #e3f2fd; color: #1565c0; font-weight: 600; font-size: 0.75rem; }
    .status-chip-accepted { background: #e8f5e9; color: #2e7d32; font-weight: 600; font-size: 0.75rem; }
    .status-chip-rejected { background: #ffebee; color: #b71c1c; font-weight: 600; font-size: 0.75rem; }
    .empty-state { text-align: center; padding: 4rem 2rem; color: #94a3b8; }
    .empty-state mat-icon { font-size: 64px; width: 64px; height: 64px; color: #cbd5e1; }
    .empty-state p { margin-top: 1rem; font-size: 1rem; }
    .loading-state { display: flex; flex-direction: column; align-items: center; padding: 4rem; gap: 1rem; color: #64748b; }
    .job-title-badge { background: #eff6ff; color: #2563eb; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
  `],
  template: `
    <div class="application-list">
      <div class="list-header">
        <div>
          <h3>
            Candidates
            <span class="job-title-badge" *ngIf="jobTitle">{{ jobTitle }}</span>
          </h3>
          <p *ngIf="!isLoading">{{ applications.length }} application(s) found</p>
        </div>
        <button mat-stroked-button color="primary" routerLink="../posted-jobs">
          <mat-icon>arrow_back</mat-icon> Back to Jobs
        </button>
      </div>

      <!-- Loading -->
      <div class="loading-state" *ngIf="isLoading">
        <mat-spinner diameter="40"></mat-spinner>
        <p>Loading applications...</p>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!isLoading && applications.length === 0">
        <mat-icon>inbox</mat-icon>
        <p>No applications received for this position yet.</p>
      </div>

      <!-- Applications Table -->
      <table mat-table [dataSource]="applications" class="mat-elevation-z2"
             *ngIf="!isLoading && applications.length > 0">

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Candidate Name </th>
          <td mat-cell *matCellDef="let app"> <strong>{{app.name}}</strong> </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let app"> {{app.email}} </td>
        </ng-container>

        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef> Phone </th>
          <td mat-cell *matCellDef="let app"> {{app.phone}} </td>
        </ng-container>

        <ng-container matColumnDef="experience">
          <th mat-header-cell *matHeaderCellDef> Experience </th>
          <td mat-cell *matCellDef="let app"> {{app.experience}} </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Applied On </th>
          <td mat-cell *matCellDef="let app"> {{app.applicationDate | date:'dd MMM yyyy'}} </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let app">
            <span [class]="'status-chip-' + app.status"
                  style="padding: 4px 10px; border-radius: 12px; display: inline-block;">
              {{ app.status | uppercase }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let app">
            <button mat-icon-button color="primary" title="Mark as Reviewed"
                    (click)="updateStatus(app, 'reviewed')">
              <mat-icon>visibility</mat-icon>
            </button>
            <button mat-icon-button color="accent" title="Accept Candidate"
                    (click)="updateStatus(app, 'accepted')">
              <mat-icon>check_circle</mat-icon>
            </button>
            <button mat-icon-button color="warn" title="Reject Candidate"
                    (click)="updateStatus(app, 'rejected')">
              <mat-icon>cancel</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class RecentApplications implements OnInit, OnDestroy {
  applications: Application[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'experience', 'date', 'status', 'actions'];
  isLoading = true;
  jobTitle = '';
  private routeSub?: Subscription;

  constructor(private route: ActivatedRoute, private applicantService: ApplicantService) { }

  ngOnInit(): void {
    // Use paramMap observable (not snapshot) so re-navigation to a different job refreshes data
    this.routeSub = this.route.paramMap.subscribe(params => {
      const jobId = params.get('jobId');
      if (jobId) {
        this.isLoading = true;
        this.applications = [];
        this.applicantService.getApplicationsByJob(Number(jobId)).subscribe({
          next: (apps) => {
            this.applications = apps;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      }
    });
  }

  updateStatus(app: Application, newStatus: 'reviewed' | 'accepted' | 'rejected') {
    // Optimistically update UI
    app.status = newStatus;
    // Persist to JSON Server
    this.applicantService.updateApplicationStatus(app.id!, newStatus).subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
