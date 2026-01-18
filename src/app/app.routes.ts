import { Routes } from '@angular/router';
import { JobList } from './components/job-list/job-list';
import { JobDetail } from './components/job-detail/job-detail';
import { ApplyJob } from './components/apply-job/apply-job';
import { CompanyDashboard } from './components/company-dashboard/company-dashboard';
import { Login } from './components/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobList },
    { path: 'jobs/:id', component: JobDetail },
    { path: 'apply/:jobId', component: ApplyJob },
    { path: 'dashboard', component: CompanyDashboard },
    { path: 'login', component: Login },
];
