import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './apply-job.html',
  styleUrls: ['./apply-job.scss']
})
export class ApplyJob implements OnInit {
  applyForm: FormGroup;
  jobId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicantService: ApplicantService,
    private snackBar: MatSnackBar
  ) {
    this.applyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      experience: ['', Validators.required],
      coverLetter: ['']
    });
  }

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
  }

  onSubmit(): void {
    if (this.applyForm.valid) {
      const application = {
        ...this.applyForm.value,
        jobId: this.jobId,
        applicationDate: new Date().toISOString(),
        status: 'pending',
        applicantId: 1 // Mock ID
      };

      this.applicantService.applyJob(application).subscribe({
        next: () => {
          this.snackBar.open('Application Submitted Successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/jobs']);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
