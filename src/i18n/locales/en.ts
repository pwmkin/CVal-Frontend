export default {
  common: {
    appName: "CVal",
    history: "History",
    about: "About",
    evaluateNew: "New Evaluation",
    back: "Back",
    loading: "Loading...",
    light: "Light",
    dark: "Dark",
    verifying: "Verifying your identity",
  },
  errors: {
    title: "An error occurred:",
    missing_required_fields: "Please fill in all required fields",
    resume_too_long: "Your resume is too long",
    job_title_too_long: "The job title is too long",
    user_language_too_long: "The language indicated is not valid",
    invalid_captcha:
      "The captcha is not valid, try again. If the problem persists, try using another browser",
    internal_eval_error:
      "An internal error occurred while evaluating your CV. Don't worry, it's not your fault, something is wrong with us. Please try again.",
  },
  home: {
    welcome: "Welcome to CVal",
    subtitle: "Upload your resume and get instant AI feedback",
    dropzoneText: "Drag and drop your CV file here or click to browse",
    dropzoneHint: "Supports PDF and DOC files",
    jobTitle: "Job Title",
    jobTitlePlaceholder: "Example: Junior Backend Software Engineer",
    evaluateButton: "Evaluate my CV",
    features: {
      title: "Features",
      ai: "AI-powered analysis",
      score: "Comprehensive scoring",
      keywords: "Keyword recommendations",
      suggestions: "Personalized improvement suggestions",
    },
    howItWorks: {
      title: "How It Works",
      step1: "Upload your CV",
      step2: "Our AI analyzes your document",
      step3: "Receive feedback and recommendations",
      step4: "Improve your CV and increase your chances",
    },
    processingTitle: "Processing your CV",
    processingStep1: "Reading document",
    processingStep2: "Analyzing document using AI",
  },
  history: {
    title: "History",
    subtitle:
      "Your previous CV evaluations (This data is saved in your local browser)",
    search: "Search previous results",
    date: "Date",
    score: "Score",
    clear: "Clear",
  },
  results: {
    title: "Evaluation Results",
    tabs: {
      overview: "Overview",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      format: "Format",
      recommendations: "Recommendations",
    },
    experience: {
      projects: "Projects",
    },
    skills: {
      listed: "Listed",
      missing: "Missing",
      leftover: "Leftover (Irrelevant for the position)",
    },
    education: {
      certifications: "Certifications",
      certificationsList: "Certifications List",
    },
    languages: {
      detected: "Detected",
    },
    format: {
      issues: "Issues",
    },
    recommendations: {
      priority: "Priority",
      general: "General",
    },
    summary: "Summary",
    strengths: "Strengths",
    weaknesses: "Areas for Improvement",
    share: "Share",
    downloadPdf: "Download as PDF",
    tips: "Improvement Tips (General)",
  },
  about: {
    title: "About CVal",
    subtitle: "Simplified AI-powered CV evaluation",
    mission: {
      title: "Our Mission",
      description:
        "Our goal is to simplify CV evaluation so candidates have a better chance to stand out in the job market.",
    },
    featuresTitle: "Features",
    features: {
      ai: {
        title: "AI-powered analysis",
        description:
          "We use advanced AI algorithms to analyze your resume and provide useful feedback to help you stand out in the job market.",
      },
      scoring: {
        title: "Comprehensive scoring",
        description:
          "Get a comprehensive score for your CV, including content, format, and relevance.",
      },
      suggestions: {
        title: "Personalized improvement suggestions",
        description:
          "Get personalized improvement suggestions for your CV based on your skills and experience.",
      },
      privacy: {
        title: "Privacy",
        description:
          "Your privacy is important to us. Your data won't be stored on our servers. Your previous CV evaluation history is saved in your local browser.",
      },
    },
    faqTitle: "Frequently Asked Questions",
    faq: {
      question1: "How many times can I evaluate my CV?",
      answer1:
        "As many times as you want. However, we ask you to use the service prudently. Otherwise, we may affect your user experience or block your access.",
      question2: "Is it safe to use CVal?",
      answer2:
        "Always. Our service is secure and private. Your data won't be stored on our servers. Your previous CV evaluation history is saved in your local browser.",
      question3: "What's the cost of using CVal?",
      answer3: "Free. CVal is a free service for all users.",
      question4: "How is CVal built?",
      answer4:
        "CVal is open source. We invite you to check CVal's GitHub repository to see the source code and technologies used to develop it.",
    },
    madeWith: "CVal was developed with",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
  },
  tips: {
    summary: {
      strong: "Your Professional Summary is strong",
      present: "You Need to Improve Your Professional Summary",
      missing: "Incomplete Professional Summary",
    },
    experience: {
      strong: "You have solid work experience ({{years}} years)",
      present: "You Need to Improve Your Work Experience",
      missing: "Incomplete Work Experience",
    },
    education: {
      strong: "Your Education is strong ({{level}})",
      present: "You Need to Improve Your Education Level in the CV",
      missing: "Missing Education Information",
    },
    skills: {
      strong: "You have a good Skills score",
      missing: "Missing required skills: {{missing}}",
      general: {
        0: "Add the missing skills you already possess to your resume.",
        1: "Consider improving your skills in missing areas through online courses or certifications.",
        2: "Prioritize technical and hard skills that can be verified.",
        3: "Group similar skills together for better readability.",
      },
    },
    languages: {
      strong: "Good language proficiency",
      present: "The Languages section needs improvement",
      missing: "Missing Language Information",
      general: {
        0: "Use standardized proficiency levels (e.g., Fluent, Native, C1, B2).",
        1: "Include language certifications if you have them.",
        2: "Only list languages you can actually communicate in.",
      },
    },
    format: {
      clean: {
        yes: "Your CV has good formatting",
        yesSort: "Clean",
        no: "Your CV needs formatting improvements",
        noSort: "Messy",
      },
      general: {
        0: "Use a uniform font throughout your resume (Arial, Calibri, or Times New Roman).",
        1: "Maintain uniform spacing and margins (0.5 to 1 inch on all sides).",
        2: "Ensure all bullets and section headers follow the same format.",
      },
    },
    recommendations: {
      general: {
        0: "Tailor your resume to each job application to highlight relevant skills and experience.",
        1: "Use action verbs to begin describing your experience with bullet points.",
        2: 'Quantify your achievements whenever possible (e.g., "Increased sales by 20%").',
        3: "Limit your resume to 1 or 2 pages, depending on your experience level.",
      },
    },
  },
};
