<div align="center">

# 💼 Job Portal & Recruitment Management System

### Built with Angular v21 · TypeScript · Angular Material · JSON Server

[![Angular](https://img.shields.io/badge/Angular-v21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material](https://img.shields.io/badge/Angular_Material-UI-009688?style=for-the-badge&logo=angular&logoColor=white)](https://material.angular.io)
[![JSON Server](https://img.shields.io/badge/JSON_Server-REST_API-FF6C37?style=for-the-badge)](https://github.com/typicode/json-server)

</div>

---

## 📖 Table of Contents

- [Abstract](#-abstract)
- [Features](#-features)
- [Technology Stack](#%EF%B8%8F-technology-stack)
- [System Architecture](#-system-architecture)
- [Angular Implementation](#-angular-implementation-details)
  - [TypeScript Models](#1-typescript-models--interfaces)
  - [Component Design](#2-component-design)
  - [Routing & Guards](#3-routing--navigation)
  - [Services & DI](#4-services--dependency-injection)
  - [Forms & Validation](#5-forms--validation)
  - [Custom Pipes & Directives](#6-custom-pipes--directives)
  - [Angular Material & Dialogs](#7-angular-material--ui-design)
  - [Observables & HTTP Interceptors](#8-observables-http-client--error-handling)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Route Reference](#-route-reference)
- [Future Enhancements](#-future-enhancements)

---

## 📝 Abstract

The **Job Portal and Recruitment Management System** is a modern Single Page Application (SPA) developed using **Angular v21** and **TypeScript** to streamline the recruitment process between job seekers and recruiters.

The application provides an interactive platform where:
- **Candidates** can explore job opportunities, filter listings, and apply for positions
- **Recruiters** can manage job postings, review applications, and update candidate statuses

The project leverages Angular's full-featured toolkit — component-based architecture, child routing, route guards, services with dependency injection, reactive and template-driven forms, custom pipes, custom directives, HTTP interceptors, and Angular Material UI — to build a production-grade, scalable, and maintainable system. A mock backend using **JSON Server** simulates real-time data persistence and CRUD operations without requiring a dedicated server.

---

## ✨ Features

### 🔍 For Job Seekers

| Feature | Description |
|---------|-------------|
| 🗂 **Job Listings** | Browse all open positions displayed on dynamic Angular Material cards |
| 🔎 **Smart Filtering** | Filter jobs by title (autocomplete), location, and job type in real-time |
| ⭐ **Featured Jobs** | Highlighted job cards powered by a custom `HighlightDirective` |
| 📄 **Job Detail View** | Full job description, salary, experience requirements, and view count tracking |
| 📤 **Apply for Jobs** | Submit applications through a validated Reactive Form |
| 💬 **Confirmation Dialog** | Professional `MatDialog` prompt before submitting an application |
| ✅ **Success Feedback** | Real-time `MatSnackBar` notifications for all major actions |

### 🔐 For Recruiters

| Feature | Description |
|---------|-------------|
| 🔑 **Secure Login** | Role-based login (`Job Seeker` / `Recruiter`) via a template-driven form |
| 🛡 **Route Guard** | `AuthGuard` blocks unauthorized access to recruiter areas |
| 📊 **Company Dashboard** | Overview statistics: total jobs, applicants, and views |
| 📋 **Posted Jobs View** | Child route listing all company job postings with live applicant counts |
| 👥 **Applicant Tracking** | Child route showing all candidates per job with phone, experience, and status |
| 🟢 **Status Updates** | Update applicant status (`Reviewed`, `Accepted`, `Rejected`) with one click |
| ➕ **Post New Jobs** | Reactive form to create new job vacancies for the company |

### ⚙️ System-Wide

| Feature | Description |
|---------|-------------|
| 🌐 **Global Error Handling** | `ErrorInterceptor` catches all HTTP failures and notifies users globally |
| 📱 **Responsive Design** | Mobile-friendly layouts using Angular Material grid and SCSS |
| 🎨 **Material Theming** | Custom CSS variable system for colors, shadows, and typography |

---

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Angular | v21 | Core SPA framework |
| **Language** | TypeScript | 5.x | Application logic and type safety |
| **UI Library** | Angular Material | v21 | Components, theming, and dialogs |
| **Styling** | SCSS | 3.x | Custom styles and responsive layouts |
| **State/Async** | RxJS | 7.x | Observables and reactive data flow |
| **Mock Backend** | JSON Server | 0.17 | Simulated REST API |
| **Package Manager** | npm | 9+ | Dependency management |
| **Runtime** | Node.js | 18+ | Development environment |
| **Testing** | Vitest | Latest | Unit testing |
| **IDE** | VS Code | Latest | Development environment |

---

## 🏗 System Architecture

```
                    ┌─────────────────────────────────┐
                    │        User (Browser)             │
                    │     http://localhost:4200         │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │       Angular Application        │
                    │                                  │
                    │  Components ←→  Services         │
                    │      ↕              ↕            │
                    │  Directives   ErrorInterceptor   │
                    │      ↕              ↕            │
                    │   Pipes        HttpClient        │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │      JSON Server (Mock API)      │
                    │     http://localhost:3000         │
                    │                                  │
                    │   GET  /jobs                     │
                    │   POST /applications              │
                    │   GET  /companies                 │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │         db.json (Database)       │
                    │    jobs, companies, applications  │
                    └─────────────────────────────────┘
```

---

## 🔩 Angular Implementation Details

### 1. TypeScript Models & Interfaces

All data entities are strictly typed using TypeScript interfaces:

**`Job` Interface:**
```typescript
export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;     // 'Full Time' | 'Part Time' | 'Remote' | 'Internship'
  salary: number;
  experience: string;
  description: string;
  companyId: number;
  postedDate: string;
  views?: number;
  applications?: Application[];
}
```

**`Application` Interface:**
```typescript
export interface Application {
  id?: number;
  jobId: number;
  applicantId: number;
  applicationDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  name: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter?: string;
}
```

**`Company` Interface:**
```typescript
export interface Company {
  id?: number;
  name: string;
  email: string;
  industry?: string;
}
```

---

### 2. Component Design

All components are **standalone** using Angular's modern architecture (no NgModules):

| Component | Selector | Route | Purpose |
|-----------|----------|-------|---------|
| `NavbarComponent` | `app-navbar` | Global | Navigation bar with auth state |
| `JobList` | `app-job-list` | `/jobs` | Browse and filter job listings |
| `JobDetail` | `app-job-detail` | `/jobs/:id` | Full job info with view tracking |
| `ApplyJob` | `app-apply-job` | `/apply/:jobId` | Application form + dialog |
| `Login` | `app-login` | `/login` | Auth form with role selection |
| `PostJob` | `app-post-job` | `/post-job` | Create new job vacancies |
| `CompanyDashboard` | `app-company-dashboard` | `/dashboard` | Parent layout with stats |
| `PostedJobs` | `app-posted-jobs` | `/dashboard/posted-jobs` | Child: company job list |
| `RecentApplications` | `app-recent-applications` | `/dashboard/applications/:jobId` | Child: candidate listing |
| `ConfirmDialog` | `app-confirm-dialog` | — | Reusable Material Dialog |

**Directives Used:**

```html
<!-- *ngFor – Job card iteration -->
<mat-card *ngFor="let job of filteredJobs">

<!-- *ngIf – Conditional rendering -->
<mat-spinner *ngIf="isLoading"></mat-spinner>
<div *ngIf="jobs.length === 0">No jobs found</div>

<!-- [ngStyle] – Dynamic inline styles -->
<span [ngStyle]="{'color': app.status === 'pending' ? 'orange' : 'green'}">

<!-- [ngClass] – Dynamic class application -->
<span [class]="'status-chip-' + app.status">
```

---

### 3. Routing & Navigation

Complete route configuration in `app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: '',               redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs',           component: JobList },
  { path: 'jobs/:id',       component: JobDetail },       // Route Parameter
  { path: 'apply/:jobId',   component: ApplyJob },        // Route Parameter
  { path: 'login',          component: Login },
  {
    path: 'dashboard',
    component: CompanyDashboard,
    canActivate: [AuthGuard],                              // Route Guard
    children: [                                            // Child Routes
      { path: '',                    redirectTo: 'posted-jobs', pathMatch: 'full' },
      { path: 'posted-jobs',         component: PostedJobs },
      { path: 'applications/:jobId', component: RecentApplications }
    ]
  },
  { path: 'post-job',       component: PostJob, canActivate: [AuthGuard] }
];
```

**Route Guard (`AuthGuard`):**

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean | UrlTree {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.role === 'company') return true;
    return this.router.createUrlTree(['/login']); // Redirect unauthorized users
  }
}
```

---

### 4. Services & Dependency Injection

Three core services handle all business logic:

**`JobService`** – manages job CRUD:
```typescript
getJobs(): Observable<Job[]>
getJobById(id: number): Observable<Job>
getJobsByCompany(companyId: number): Observable<Job[]>
addJob(job: Job): Observable<Job>
incrementJobView(job: Job): Observable<Job>
```

**`ApplicantService`** – manages applications:
```typescript
applyJob(application: Application): Observable<Application>
getApplicationsByJob(jobId: number): Observable<Application[]>
updateApplicationStatus(id: number, status: string): Observable<Application>
```

**`CompanyService`** – manages company/recruiter data:
```typescript
login(email: string): Observable<Company[]>
getCompanyById(id: number): Observable<Company>
register(company: Company): Observable<Company>
```

All services use Angular's **`@Injectable({ providedIn: 'root' })`** pattern for singleton-scoped Dependency Injection.

---

### 5. Forms & Validation

**Template-Driven Form (Login):**

```html
<form (ngSubmit)="onLogin()" #loginForm="ngForm">
  <input matInput [(ngModel)]="email" name="email" required type="email">
  <mat-select [(ngModel)]="role" name="role" required>
    <mat-option value="applicant">Job Seeker</mat-option>
    <mat-option value="company">Recruiter</mat-option>
  </mat-select>
  <button [disabled]="!email">LOGIN</button>
</form>
```

**Reactive Form (Apply Job) with validators:**

```typescript
this.applyForm = this.fb.group({
  name:        ['', Validators.required],
  email:       ['', [Validators.required, Validators.email]],
  phone:       ['', Validators.required],
  experience:  ['', Validators.required],
  coverLetter: ['']
});
```

**Reactive Form (Post Job):**

```typescript
this.jobForm = this.fb.group({
  title:       ['', Validators.required],
  location:    ['', Validators.required],
  type:        ['', Validators.required],
  salary:      ['', Validators.required],
  experience:  ['', Validators.required],
  description: ['', Validators.required],
});
```

---

### 6. Custom Pipes & Directives

**Custom `FilterPipe`** (`src/app/pipes/filter.pipe.ts`):

```typescript
@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!items || !searchText) return items;
    return items.filter(it =>
      it[field].toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
```

**Custom `HighlightDirective`** (`src/app/directives/highlight.directive.ts`):

```typescript
@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective implements OnInit {
  @Input('appHighlight') isFeatured: boolean = false;

  ngOnInit() {
    if (this.isFeatured) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #3f51b5');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f2ff');
      // Also appends a "FEATURED" badge DOM element
    }
  }
}
```

**Applied in template:**
```html
<mat-card [appHighlight]="job.id % 2 === 0">
```

**Built-in Pipes Used:**

```html
{{ job.salary | currency:'INR':'symbol':'1.0-0' }}
{{ job.postedDate | date:'dd MMM yyyy' }}
{{ job.description | slice:0:120 }}
{{ app.status | uppercase }}
```

---

### 7. Angular Material & UI Design

**Material Components used across the app:**

| Component | Where Used |
|-----------|-----------|
| `MatCard` | Job listings, Dashboard stats |
| `MatTable` | Applicant tracking table |
| `MatToolbar` | Navbar |
| `MatFormField / MatInput` | All forms |
| `MatButton / MatIconButton` | All CTAs and actions |
| `MatIcon` | Navigation, actions, status icons |
| `MatDialog` | Application confirmation popup |
| `MatSnackBar` | Success / Error notifications |
| `MatSelect` | Job type and location filters |
| `MatAutocomplete` | Job title search suggestions |
| `MatProgressSpinner` | Page loading indicators |
| `MatDivider` | Section separators |

**Confirmation Dialog implementation:**

```typescript
// Opens dialog → user confirms → submits application
const dialogRef = this.dialog.open(ConfirmDialog, {
  width: '350px',
  data: { title: 'Confirm Application', message: 'Submit your application?' }
});
dialogRef.afterClosed().subscribe(result => {
  if (result) { this.applicantService.applyJob(this.application).subscribe(); }
});
```

---

### 8. Observables, HTTP Client & Error Handling

**Observable subscription pattern:**
```typescript
this.jobService.getJobs().subscribe({
  next: (data) => { this.jobs = data; this.isLoading = false; },
  error: (e) => { this.errorMessage = e.message; this.isLoading = false; }
});
```

**Global `ErrorInterceptor`** (`src/app/interceptors/error.interceptor.ts`):

```typescript
export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const msg = error.status === 0
        ? 'Cannot connect to server. Is JSON Server running?'
        : `Error ${error.status}: ${error.message}`;
      snackBar.open(msg, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
      return throwError(() => error);
    })
  );
};
```

**Registered globally in `app.config.ts`:**
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule)
  ]
};
```

---

## 📂 Project Structure

```
job-portal-angular-main/
├── db.json                          ← Mock database (jobs, companies, applications)
├── package.json                     ← Scripts and dependencies
├── angular.json                     ← Angular CLI config
├── tsconfig.json                    ← TypeScript compiler config
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss                  ← Global styles and Material theme overrides
    └── app/
        ├── app.ts                   ← Root component
        ├── app.html                 ← Root template
        ├── app.config.ts            ← Global providers and interceptors
        ├── app.routes.ts            ← All route definitions
        │
        ├── components/
        │   ├── navbar/              ← Global nav with auth state
        │   ├── job-list/            ← Main listing with filters
        │   ├── job-detail/          ← Single job view
        │   ├── apply-job/           ← Application form
        │   ├── login/               ← Auth form
        │   ├── post-job/            ← Job creation form
        │   ├── company-dashboard/   ← Dashboard shell + stats
        │   │   ├── posted-jobs.ts           ← Child route: job list
        │   │   └── recent-applications.ts   ← Child route: applicant table
        │   └── confirm-dialog/      ← Reusable Material Dialog
        │
        ├── services/
        │   ├── job.service.ts
        │   ├── applicant.service.ts
        │   └── company.service.ts
        │
        ├── models/
        │   ├── job.model.ts
        │   ├── applicant.model.ts
        │   ├── application.model.ts
        │   └── company.model.ts
        │
        ├── guards/
        │   └── auth.guard.ts        ← Protects /dashboard and /post-job
        │
        ├── interceptors/
        │   └── error.interceptor.ts ← Global HTTP error handling
        │
        ├── pipes/
        │   └── filter.pipe.ts       ← Custom search filter
        │
        └── directives/
            └── highlight.directive.ts ← Custom featured-job highlighter
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | v18+ | `node -v` |
| npm | v9+ | `npm -v` |
| Angular CLI | Latest | `ng version` |

Install Angular CLI if not installed:
```bash
npm install -g @angular/cli
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Ankitpaiii/job-portal.git

# 2. Navigate into the project
cd job-portal

# 3. Install all dependencies
npm install
```

### Running the Application

> ⚠️ The app requires **two terminals running simultaneously**.

**Terminal 1 – Start Mock API (json-server):**
```bash
npm run server
```
Runs at: `http://localhost:3000`

Available endpoints:
```
GET    http://localhost:3000/jobs
POST   http://localhost:3000/jobs
GET    http://localhost:3000/companies
GET    http://localhost:3000/applications
POST   http://localhost:3000/applications
PATCH  http://localhost:3000/applications/:id
```

**Terminal 2 – Start Angular Dev Server:**
```bash
npm start
```
App runs at: `http://localhost:4200`

---

## 🔗 API Reference

The application communicates with JSON Server at `http://localhost:3000`.

| Method | Endpoint | Parameters | Description |
|--------|----------|------------|-------------|
| GET | `/jobs` | — | Fetch all jobs |
| GET | `/jobs/:id` | `id` – Job ID | Get single job |
| GET | `/jobs?companyId=1` | `companyId` | Get jobs by company |
| POST | `/jobs` | Job object | Create new job |
| PATCH | `/jobs/:id` | `{ views }` | Update view count |
| GET | `/applications?jobId=1` | `jobId` | Get applications for job |
| POST | `/applications` | Application object | Submit an application |
| PATCH | `/applications/:id` | `{ status }` | Update status |
| GET | `/companies?email=` | `email` | Login lookup |

---

## 🗺 Route Reference

| URL | Component | Access | Description |
|-----|-----------|--------|-------------|
| `/` | — | Public | Redirects to `/jobs` |
| `/jobs` | `JobList` | Public | Browse all jobs |
| `/jobs/:id` | `JobDetail` | Public | View single job |
| `/apply/:jobId` | `ApplyJob` | Public | Submit application |
| `/login` | `Login` | Public | Authentication |
| `/dashboard` | `CompanyDashboard` | 🔒 Recruiter | Dashboard shell |
| `/dashboard/posted-jobs` | `PostedJobs` (Child) | 🔒 Recruiter | Job management |
| `/dashboard/applications/:jobId` | `RecentApplications` (Child) | 🔒 Recruiter | Applicant tracking |
| `/post-job` | `PostJob` | 🔒 Recruiter | Create new job |

---

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

---

## 🏗 Build for Production

```bash
npm run build
```
Output in `dist/` directory.

---

## 🚀 Future Enhancements

- [ ] JWT-based authentication with backend integration
- [ ] Node.js / Spring Boot REST API to replace JSON Server
- [ ] Resume upload and PDF parsing
- [ ] AI-powered job recommendation engine
- [ ] Email notifications for application status updates
- [ ] Admin panel for platform-level management
- [ ] Cloud deployment (Firebase Hosting / Vercel)
- [ ] Real-time updates using WebSockets

---

## 🙏 Acknowledgements

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [JSON Server](https://github.com/typicode/json-server)

---

<div align="center">
Made with ❤️ by Batch 59 — Advanced JavaScript Frameworks
</div>
