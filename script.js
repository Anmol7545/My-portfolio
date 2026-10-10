const resumeFacts = [
  {
    section: 'Profile',
    text: 'Anmol Mishra is a software developer role candidate and Software Development Engineer aspirant based in New Delhi, India. He is interested in problem solving and building efficient, scalable software solutions.',
    terms: 'profile about summary candidate software developer sde location new delhi india objective goals',
  },
  {
    section: 'Contact',
    text: 'Anmol can be reached at anmolmishra7545@gmail.com or +91 93300 69580.',
    terms: 'contact email phone reach connect',
  },
  {
    section: 'Profiles',
    text: 'Anmol’s GitHub username is Anmol7545: https://github.com/Anmol7545. His LinkedIn profile is https://www.linkedin.com/in/anmolmishra7545/.',
    terms: 'github git hub linkedin social profile account username user name id handle url link',
  },
  {
    section: 'Experience',
    text: 'Anmol worked as a Frontend Developer Intern at Mandupp Pvt. Ltd. in Noida from March 2026 to September 2026. He developed and maintained web platform interfaces, built responsive user interfaces, and collaborated with design and development teams to implement features and improve user experience. Technologies used: React, Tailwind CSS, Node.js, Express, and MongoDB.',
    terms: 'experience internship work job company mandupp frontend front end developer react tailwind node express mongodb noida march september 2026 responsibilities',
  },
  {
    section: 'Project · UPI Fraud Detection',
    text: 'Anmol developed a real-time UPI fraud detection system using Random Forest and XGBoost. The project reduced false positives by 18% through algorithm improvements and achieved 96%+ accuracy using SMOTE for imbalanced transaction data. It has a React frontend and Dockerized deployment. Technologies: Python, FastAPI, React, scikit-learn, and Docker.',
    terms: 'project upi fraud detection finance payments transaction random forest xgboost accuracy 96 18 false positive smote python fastapi react sklearn docker',
  },
  {
    section: 'Project · Code Atlas AI',
    text: 'Code Atlas AI is an AI-powered platform Anmol built to analyze GitHub repositories and answer natural-language questions about codebases. It uses embeddings and vector search to retrieve relevant code and provide context-aware responses, with REST APIs for repository ingestion, code analysis, search, and AI-powered code understanding. Technologies: Python, FastAPI, PostgreSQL, LLMs, embeddings, vector search, and REST APIs.',
    terms: 'project code atlas ai github repo repository codebase question answer natural language semantic search embeddings vector database postgres fastapi python llm rest api',
  },
  {
    section: 'Project · Plant Disease Detection',
    text: 'Anmol trained a CNN model on the PlantVillage dataset for AI plant disease detection, achieving over 94% accuracy. He created a Flask REST API for real-time disease prediction with response time under one second. Technologies: Python, TensorFlow, Flask, and Docker.',
    terms: 'project plant disease agriculture crop farming computer vision cnn tensorflow plantvillage accuracy 94 flask api prediction docker python response time',
  },
  {
    section: 'Education',
    text: 'Anmol is pursuing a Bachelor of Technology in Electronics and Communication Engineering at Inderprastha Engineering College, Ghaziabad, from 2023 to 2027.',
    terms: 'education college university degree bachelor btech b.tech electronics communication engineering inderprastha ghaziabad 2023 2027',
  },
  {
    section: 'Skills',
    text: 'Programming languages: Java, Python, JavaScript, and SQL. Frameworks and libraries: React.js, HTML5, CSS3, FastAPI, Flask, Node.js, Tailwind CSS, NumPy, and TensorFlow. Databases: MongoDB, MySQL, SQLite. Tools and platforms: Git, GitHub, Docker, VS Code, and Linux. Foundations include Data Structures and Algorithms, Object-Oriented Programming, DBMS, and Computer Networks.',
    terms: 'skills tech stack technologies programming language java python javascript sql react html css fastapi flask node tailwind numpy tensorflow database mongodb mysql sqlite git github docker vscode linux data structures algorithms dsa oop object oriented dbms computer networks',
  },
  {
    section: 'Certifications',
    text: 'Anmol completed DSA with Java and Full Stack Development through Apna College, and earned the HackerRank Software Engineer Intern Role Certification in July 2026.',
    terms: 'certification certificate course apna college hackerrank software engineer intern role dsa java full stack july 2026',
  },
];

const chatPanel = document.getElementById('chatPanel');
const chatLauncher = document.getElementById('chatLauncher');
const chatCloseButton = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const visitorMessageForm = document.getElementById('visitorMessageForm');

const stopWords = /\b(what|tell|about|does|do|his|him|he|anmol|can|you|me|please|is|are|the|a|an|and|for|with|has|have|did|worked|know|more|describe|explain)\b/g;
const synonyms = {
  frontend: 'frontend front end user interface ui',
  back: 'backend server api',
  ai: 'artificial intelligence machine learning ml llm',
  ml: 'machine learning artificial intelligence ai',
  fraud: 'fraud detection transaction payments upi',
  crops: 'crop plant agriculture farming',
  salary: 'salary compensation pay',
  notice: 'notice period availability available',
  location: 'location new delhi india noida ghaziabad',
  degree: 'degree education bachelor btech',
  contact: 'contact email phone connect reach',
  strengths: 'skills foundations problem solving',
  fullstack: 'full stack frontend backend',
};

function setChatOpen(isOpen) {
  chatPanel.classList.toggle('open', isOpen);
  chatPanel.setAttribute('aria-hidden', String(!isOpen));
  chatLauncher.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    window.setTimeout(() => chatInput.focus(), 180);
  }
}

function normalizeWords(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .replace(stopWords, ' ')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function retrieveResumeFacts(question) {
  const queryWords = normalizeWords(question);
  const expandedWords = new Set(queryWords);

  queryWords.forEach((word) => {
    const relatedWords = synonyms[word] || '';
    relatedWords.split(' ').filter(Boolean).forEach((relatedWord) => {
      expandedWords.add(relatedWord);
    });
  });

  return resumeFacts
    .map((fact) => {
      const factWords = new Set(
        normalizeWords(`${fact.section} ${fact.text} ${fact.terms}`),
      );
      let score = 0;

      expandedWords.forEach((word) => {
        if (factWords.has(word)) {
          score += queryWords.includes(word) ? 2 : 0.65;
        }
      });

      const lowerQuestion = question.toLowerCase();
      if (lowerQuestion.includes('project') && fact.section.startsWith('Project')) {
        score += 2;
      }
      if (
        (lowerQuestion.includes('experience') || lowerQuestion.includes('intern')) &&
        fact.section === 'Experience'
      ) {
        score += 3;
      }
      if (
        (lowerQuestion.includes('contact') ||
          lowerQuestion.includes('email') ||
          lowerQuestion.includes('phone')) &&
        fact.section === 'Contact'
      ) {
        score += 5;
      }

      return { fact, score };
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map((result) => result.fact);
}

function addMessage(text, role, sources = [], profileLinks = []) {
  const message = document.createElement('div');
  message.className = `message ${role}`;
  message.textContent = text;

  if (sources.length > 0) {
    const sourceLabel = document.createElement('small');
    sourceLabel.textContent = `RESUME · ${sources.join(' · ')}`;
    message.append(sourceLabel);
  }

  if (profileLinks.length > 0) {
    const actions = document.createElement('div');
    actions.className = 'profile-actions';

    profileLinks.forEach(({ label, url }) => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `Open ${label} profile ↗`;
      actions.append(link);
    });

    message.append(actions);
  }

  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerQuestion(question) {
  const lowerQuestion = question.toLowerCase();
  const asksGitHub = /\b(github|git\s+hub|githud)\b/.test(lowerQuestion) &&
    !/\b(project|repos?|repository|codebase|code atlas)\b/.test(lowerQuestion);
  const asksLinkedIn = /\blinked\s?in\b/.test(lowerQuestion);

  if (asksGitHub || asksLinkedIn) {
    const profileLinks = [];
    const profileDetails = [];

    if (asksGitHub) {
      profileDetails.push('GitHub: @Anmol7545. Would you like to see Anmol’s GitHub profile?');
      profileLinks.push({ label: 'GitHub', url: 'https://github.com/Anmol7545' });
    }
    if (asksLinkedIn) {
      profileDetails.push('LinkedIn ID: anmolmishra7545. Would you like to see Anmol’s LinkedIn profile?');
      profileLinks.push({ label: 'LinkedIn', url: 'https://www.linkedin.com/in/anmolmishra7545/' });
    }

    addMessage(profileDetails.join('\n'), 'bot', ['Profiles'], profileLinks);
    return;
  }

  const matchingFacts = retrieveResumeFacts(question);

  if (matchingFacts.length === 0) {
    addMessage(
      'I couldn’t find that detail in Anmol’s resume. Try asking about his internship, projects, skills, education, certifications, or contact information.',
      'bot',
    );
    return;
  }

  const isGeneralQuestion =
    normalizeWords(question).length === 0 ||
    /^(who|profile|summary|background|about)$/i.test(question.trim());
  const factsToShare = isGeneralQuestion
    ? [resumeFacts[0], resumeFacts[2], resumeFacts[3], resumeFacts[6]]
    : matchingFacts;

  const answer = factsToShare.map((fact) => fact.text).join('\n\n');
  const sources = factsToShare.map((fact) => fact.section);
  addMessage(answer, 'bot', sources);
}

function submitQuestion(question) {
  const cleanedQuestion = question.trim();
  if (!cleanedQuestion) return;

  setChatOpen(true);
  addMessage(cleanedQuestion, 'user');
  chatInput.value = '';
  window.setTimeout(() => answerQuestion(cleanedQuestion), 220);
}

chatLauncher.addEventListener('click', () => {
  setChatOpen(!chatPanel.classList.contains('open'));
});

chatCloseButton.addEventListener('click', () => setChatOpen(false));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setChatOpen(false);
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitQuestion(chatInput.value);
});

document.querySelectorAll('.suggestions button').forEach((button) => {
  button.addEventListener('click', () => submitQuestion(button.textContent));
});

visitorMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(visitorMessageForm);
  const visitorName = formData.get('name').trim();
  const visitorId = formData.get('visitorId').trim();
  const visitorNote = formData.get('message').trim();
  const subject = encodeURIComponent(`Portfolio message from ${visitorName}`);
  const body = encodeURIComponent(
    `Name: ${visitorName}\nEmail or profile ID: ${visitorId}\n\nMessage:\n${visitorNote}`,
  );

  document.getElementById('visitorMessageStatus').textContent =
    'Your email app should open with the message ready. Review it and press Send.';
  window.location.href = `mailto:anmolmishra7545@gmail.com?subject=${subject}&body=${body}`;
});
