# 💼 Job Portal and Recruitment Management System

A premium, modern Single Page Application (SPA) built using **Angular v21** and **TypeScript** designed to streamline the recruitment process. This project features a robust architecture including route guards, child routes, reactive forms, custom pipes/directives, and global HTTP error handling.

---

## 🌟 Key Features

### 🔍 For Candidates
- **Job Browsing**: Explore listings with real-time title search and category filters.
- **Detailed Insights**: View comprehensive job descriptions, salary ranges, and tracking of view counts.
- **Smart Highlighting**: Featured jobs are automatically highlighted using a **Custom Attribute Directive**.
- **One-Click Apply**: Seamless application process with professional **Material Dialog confirmation**.

### 🔐 For Recruiters (Protected Dashboard)
- **Role-Based Access**: Secure dashboard protected by **Angular Route Guards**.
- **Job Management**: Centralized view of all posted jobs under the company profile.
- **Applicant Tracking**: Dedicated child routes to view candidate lists, phone numbers, and experience levels for each job.
- **Real-Time Actions**: Update application status (Pending, Reviewed, Accepted, Rejected) with instant persistence.

---

## 🛠 Technology Stack

| Category | Technology |
|----------|------------|
| **Core** | Angular v21, TypeScript, RxJS |
| **UI/UX** | Angular Material, SCSS, Inter Font |
| **Backend** | JSON Server (Mock REST API) |
| **Testing** | Vitest, Angular Testing Library |
| **Tools** | Angular CLI, VS Code, Git |

---

## 🏗 Advanced Angular Architecture

- **Routing & Navigation**: Configuration of main routes, route parameters (:id), and professional **Child Routes** for the dashboard.
- **Security**: Implementation of `AuthGuard` to sanitize access to recruiter-only areas.
- **Services & DI**: Modular services (`JobService`, `ApplicantService`, `CompanyService`) utilizing Dependency Injection for scalable data flow.
- **Advanced Forms**: 
  - **Template-driven**: Simplified login and role selection.
  - **Reactive**: Complex validation logic for Job Applications and Vacancy Posting.
- **Pipes & Directives**:
  - `FilterPipe`: Custom pipe for real-time multi-field filtering.
  - `HighlightDirective`: Custom directive for visual importance.
- **HTTP Interceptor**: Global `ErrorInterceptor` to catch server failures and notify users via `MatSnackBar`.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ 
- **npm**: v9+
- **Angular CLI**: `npm install -g @angular/cli`

### 2. Installation
```bash
git clone https://github.com/Ankitpaiii/job-portal.git
cd job-portal
npm install
```

### 3. Running the Application
The project requires two simultaneous servers:

**Terminal A (Mock API):**
```bash
npm run server
```

**Terminal B (Frontend):**
```bash
npm start
```

---

## 📂 Project Structure

```
src/app/
├── components/
│   ├── job-list/          # List with FilterPipe & HighlightDirective
│   ├── job-detail/        # View count & dynamic routing
│   ├── apply-job/         # Reactive Form + MatDialog
│   ├── company-dashboard/ # Parent Layout + RouterOutlet
│   │   ├── posted-jobs.ts           # Child Route
│   │   └── recent-applications.ts   # Child Route
│   └── confirm-dialog/    # Reusable Material Dialog
├── guards/                # AuthGuard (Role-based security)
├── interceptors/          # ErrorInterceptor (Global notifications)
├── services/              # Job, Applicant, and Company logic
├── pipes/                 # Custom search filtering
└── directives/            # Custom UI highlighting
```

---

## 👥 Contributors (Batch 59)

- **Ankit Pai N** (2462036)
- **Joshua Zachary Jose** (2462093)
- **Jeevitha A** (2462079)
- **R Karthik** (2462131)

---

## 📄 Documentation
For detailed technical implementation, component hierarchy, and setup screenshots, please refer to the internal [CIA3 Final Report](CIA3_Final_Report.md).

---

## ⚖️ License
This project is developed for academic purposes under the **Advanced JavaScript Frameworks (Angular)** course.
