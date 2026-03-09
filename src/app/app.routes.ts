import { Routes } from '@angular/router';
import { JobList } from './components/job-list/job-list';
import { JobDetail } from './components/job-detail/job-detail';
import { ApplyJob } from './components/apply-job/apply-job';
import { CompanyDashboard } from './components/company-dashboard/company-dashboard';
import { Login } from './components/login/login';
import { PostJob } from './components/post-job/post-job';
import { AuthGuard } from './guards/auth.guard';
import { PostedJobs } from './components/company-dashboard/posted-jobs';
import { RecentApplications } from './components/company-dashboard/recent-applications';

export const routes: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobList },
    { path: 'jobs/:id', component: JobDetail },
    { path: 'apply/:jobId', component: ApplyJob },
    {
        path: 'dashboard',
        component: CompanyDashboard,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'posted-jobs', pathMatch: 'full' },
            { path: 'posted-jobs', component: PostedJobs },
            { path: 'applications/:jobId', component: RecentApplications }
        ]
    },
    { path: 'post-job', component: PostJob, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
];
