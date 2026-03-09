import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JobService } from '../../services/job.service';

@Component({
    selector: 'app-post-job',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule
    ],
    templateUrl: './post-job.html',
    styleUrls: ['./post-job.scss']
})
export class PostJob {
    jobForm: FormGroup;

    jobTypes: string[] = [
        'Full Time',
        'Part Time',
        'Internship',
        'Contract',
        'Remote'
    ];

    constructor(
        private fb: FormBuilder,
        private jobService: JobService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.jobForm = this.fb.group({
            title: ['', Validators.required],
            location: ['', Validators.required],
            type: ['', Validators.required],
            salary: ['', Validators.required],
            experience: ['', Validators.required],
            description: ['', Validators.required],
            // Mock Company ID
            companyId: [1],
            postedDate: [new Date().toISOString().split('T')[0]]
        });
    }

    onSubmit() {
        if (this.jobForm.valid) {
            this.jobService.addJob(this.jobForm.value).subscribe({
                next: () => {
                    this.snackBar.open('Job Posted Successfully!', 'Close', { duration: 3000 });
                    this.router.navigate(['/dashboard']);
                },
                error: (e) => {
                    console.error(e);
                    this.snackBar.open('Failed to post job.', 'Close', { duration: 3000 });
                }
            });
        }
    }
}
