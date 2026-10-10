# Anmol Mishra — Portfolio

A personal portfolio website for Anmol Mishra, a software developer based in New Delhi, India. It highlights selected projects, experience, education, skills, and contact information.

## Features

- Responsive single-page layout with Work, About, and Contact sections
- Selected projects in AI, fintech, developer tools, and agriculture
- Experience, education, certifications, and technical skills
- Downloadable resume and direct email and phone links
- Client-side recruiter assistant that retrieves answers from resume facts embedded in `script.js` (no backend or API required)

## Run locally

This is a static website and has no build step or package dependencies. From the project directory, start a local server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Deploy with GitHub Pages

In the `My-portfolio` repository, open **Settings → Pages**, choose **Deploy from a branch**, select the `main` branch and `/ (root)` folder, then save. GitHub Pages will publish the site from the repository root.

## Project files

```text
.
├── index.html                 # Page content and structure
├── style.css                  # Layout and responsive styling
├── theme.css                  # Visual theme
├── script.js                  # Recruiter assistant interactions and resume facts
└── assets/
    ├── anmol-mishra.png       # Profile portrait
    └── anmol-mishra-resume.pdf # Downloadable resume
```

## Contact

- Email: [anmolmishra7545@gmail.com](mailto:anmolmishra7545@gmail.com)
- Location: New Delhi, India
