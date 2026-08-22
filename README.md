# CampusConnect 🎓🚀

> **Bridge the Gap Between Campus and Industry**

CampusConnect is a career-readiness and opportunity platform designed for students, academic institutions, and industry recruiters. It empowers students to baseline their skills, discover matching career opportunities, track job applications, and upskill through structured learning paths.

---

## 📁 Project Architecture & File Directory

```
Campus Connect/
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css             # Shared CSS tokens, glassmorphism & typography
│   │   └── js/
│   │       ├── tailwind-config.js      # Extracted Tailwind theme configuration
│   │       └── app.js                  # Shared mobile drawer, navigation & interactive UI
│   ├── index.html                      # Public Landing Page & platform entry point
│   ├── login.html                      # Student & recruiter authentication portal
│   ├── signup.html                     # Account creation interface
│   ├── reset-password.html             # Account password recovery interface
│   ├── dashboard.html                  # Student overview dashboard & active stats
│   ├── dashboard-v2.html               # Alternate student dashboard variant
│   ├── profile.html                    # Student profile & resume builder
│   ├── skills.html                     # Skill matrix & competency overview
│   ├── skill-assessment.html           # Interactive skill assessment interface
│   ├── skill-gap-analysis.html         # Target role skill gap diagnostic tool
│   ├── opportunities.html              # Job & internship marketplace
│   ├── opportunity-details.html        # Detailed view for job & internship listings
│   ├── applications.html               # Application status & interview pipeline
│   ├── application-details.html        # Individual application timeline & status
│   ├── saved-opportunities.html        # Bookmarked jobs & internships
│   └── empty-states.html               # UI component & empty state library
├── .gitignore                          # Standard git ignore definitions
└── README.md                           # Production project documentation
```

---

## 🌟 Key Features

1. **Integrated Navigation & Routing**:
   - Every page features unified, production-standard relative link routing connecting authentication, dashboards, skills matrices, job marketplaces, and application tracking.
2. **Mobile & Desktop Responsive Design**:
   - Mobile navigation drawer for small viewports alongside a fixed sidebar for desktop devices.
3. **Curated Design System**:
   - Modern color palette, Material Symbols Outlined icons, `Geist` typography, smooth gradients, and glassmorphism elements.
4. **Interactive Component Architecture**:
   - Tab switchers, filter pills, dropdown menus, and modal triggers powered by light, dependency-free vanilla JavaScript (`app.js`).

---

## 🛠️ Usage & Local Execution

Open any `.html` file inside `frontend/` directly in any web browser, or launch a simple HTTP dev server:

```bash
# Using Python builtin HTTP server
python -m http.server 8000 -d frontend

# Or using npx serve
npx serve frontend
```

Then visit `http://localhost:8000` in your web browser.
