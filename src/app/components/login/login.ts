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
    if (this.role === 'applicant') {
      this.applicantService.login(this.email).subscribe(users => {
        if (users.length > 0) {
          this.snackBar.open('Login Successful as Applicant', 'Close', { duration: 3000 });
          this.router.navigate(['/jobs']);
        } else {
          this.snackBar.open('Invalid Applicant Email', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.companyService.login(this.email).subscribe(companies => {
        if (companies.length > 0) {
          this.snackBar.open('Login Successful as Company', 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open('Invalid Company Email', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
