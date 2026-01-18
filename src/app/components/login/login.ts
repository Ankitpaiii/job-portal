import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplicantService } from '../../services/applicant.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email: string = '';
  role: 'applicant' | 'company' = 'applicant';

  constructor(
    private applicantService: ApplicantService,
    private companyService: CompanyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onLogin() {
    if (this.email) {
      // Fake Login Logic as requested
      const user = {
        email: this.email,
        role: this.role
      };

      localStorage.setItem('user', JSON.stringify(user));

      this.snackBar.open(`Login Successful as ${this.role}`, 'Close', { duration: 3000 });

      if (this.role === 'company') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/jobs']);
      }
    } else {
      this.snackBar.open('Please enter an email', 'Close', { duration: 3000 });
    }
  }
}
