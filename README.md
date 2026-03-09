# 💼 Job Portal Application

A modern, responsive, and fully functional **Job Portal application** built using **Angular 21** and **Angular Material**.

This project uses a **mock REST API backend powered by json-server** to simulate real-world data interactions like job browsing, applying for positions, and a protected company dashboard for posting new jobs.

---

# ✨ Features

### 🔍 Job Browsing
View a comprehensive list of available job postings with filtering capabilities.

### 📄 Job Details
Click into individual jobs to view in-depth details, descriptions, and requirements.  
Automatically tracks job **view counts**.

### 📤 Apply for Jobs
Candidates can submit job applications directly through the platform.

### 🔐 Company Dashboard
A protected route requiring authentication, allowing companies to manage their job listings.

### ➕ Post New Jobs
Authorized companies can create and publish new job opportunities.

### 🎨 Modern UI/UX
Styled using **Angular Material components** and **custom SCSS** for a clean and responsive design.

---

# 🛠 Technology Stack

| Technology | Description |
|------------|-------------|
| Angular | Frontend framework |
| Angular Material | UI component library |
| json-server | Mock backend API |
| SCSS | Styling |
| Vitest | Unit testing |

**Versions Used**

- Angular `v21.1.0`
- Node.js `v18+`
- npm `v9+`

---

# 🚀 Getting Started

Follow the instructions below to run the project locally.

---

# 📋 Prerequisites

Make sure you have the following installed:

### Install Node.js
Download from:

```

[https://nodejs.org](https://nodejs.org)

````

Check versions:

```bash
node -v
npm -v
````

### Install Angular CLI

```bash
npm install -g @angular/cli
```

Verify installation:

```bash
ng version
```

---

# 📥 Installation

### 1️⃣ Clone the repository

```bash
git clone <your-repository-url>
```

### 2️⃣ Navigate to the project folder

```bash
cd job-portal
```

### 3️⃣ Install project dependencies

```bash
npm install
```

---

# 💻 Run the Project Locally

⚠️ The project requires **two servers running simultaneously**:

1. **Mock Backend Server**
2. **Angular Frontend Server**

---

# ▶️ Step 1: Start the Mock Database Server

Run the following command in the project root directory.

```bash
npm run server
```

This starts **json-server** and serves data from:

```
db.json
```

Server URL:

```
http://localhost:3000
```

---

# ▶️ Step 2: Start Angular Development Server

Open a **second terminal window** in the project root folder and run:

```bash
npm start
```

or

```bash
ng serve
```

Angular development server will start at:

```
http://localhost:4200
```

---

# 🌐 Open the Application

Once both servers are running, open your browser:

```
http://localhost:4200
```

The application supports **live reload**, so changes in code will automatically refresh the page.

---

# 📂 Project Structure

```
job-portal
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── job-list
│   │   │   ├── job-detail
│   │   │   ├── apply-job
│   │   │   ├── company-dashboard
│   │   │   ├── post-job
│   │   │   └── login
│   │   │
│   │   ├── services/
│   │   │   ├── job.service.ts
│   │   │   ├── applicant.service.ts
│   │   │   └── company.service.ts
│   │   │
│   │   └── app.routes.ts
│
├── db.json
└── package.json
```

---

# 📦 Important Files

### `db.json`

Mock database containing:

* Jobs
* Companies
* Applications

### `app.routes.ts`

Defines the **application routing and route guards**.

### `services/`

Handles **HTTP communication with json-server API**.

---

# 🧪 Testing

Run unit tests using **Vitest**:

```bash
npm run test
```

---

# 📦 Build for Production

To generate a production build:

```bash
npm run build
```

The compiled files will be generated inside:

```
dist/
```

---

# 👨‍💻 Development Notes

* Angular Material is used for UI components.
* JSON Server simulates REST API endpoints.
* Authentication logic protects the **Company Dashboard**.
* SCSS is used for styling and responsive layouts.

---

# ⭐ Future Improvements

* JWT authentication
* Real backend (Node.js / Spring Boot)
* Resume upload support
* Admin panel
* Job recommendation system

---


