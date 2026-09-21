export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  type: string;
  highlights: string[];
  tech: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  coursework: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const RESUME_DATA = {
  name: "Takshak Singhania",
  hindiName: {
    first: "तक्षक",
    last: "सिंघानिया",
  },
  role: "Software Engineer",
  subRole: "Full-Stack Products • Backend Systems • Interaction Design",
  location: "Bhopal, India",
  coordinates: "23.2599° N, 77.4126° E",
  contact: {
    email: "takshaksinghania1@gmail.com",
    phone: "(+91) 9351595646",
    github: "https://github.com/TakshakSinghania",
    linkedin: "https://linkedin.com/in/takshak-singhania",
    codechef: "https://www.codechef.com/users/takshak19",
  },
  summary:
    "Software Engineering student at IIIT Bhopal with experience building high-throughput web applications and full-stack systems using TypeScript, React, Node.js, PostgreSQL, Redis, and REST APIs. Experienced in collaborative development, distributed concurrency control, algorithmic optimization, and CI/CD pipelines through development teams.",
  education: [
    {
      institution: "Indian Institute of Information Technology, Bhopal",
      degree: "B.Tech. in Electronics and Communication Engineering",
      period: "Sept 2023 – Jun 2027",
      coursework: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Object-Oriented Programming",
        "Database Management Systems",
      ],
    },
  ] as EducationItem[],
  experience: [
    {
      role: "Web Development Lead",
      organization: "Axios Development Club, IIIT Bhopal",
      period: "Sep 2025 – Present",
      type: "Club Leadership",
      highlights: [
        "Managed a 6-member engineering team using Agile sprints; improved code quality through GitHub-based peer reviews and automated CI checks.",
        "Streamlined deployment workflows by automating build processes with GitHub Actions and Git version control.",
      ],
      tech: ["Agile/Scrum", "GitHub Actions", "CI/CD", "Code Reviews", "Full-Stack Mentorship"],
    },
  ] as ExperienceItem[],
  skills: [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript (ES6+)", "SQL", "C/C++", "Java", "Go"],
    },
    {
      title: "Backend & Systems",
      skills: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Redis",
        "BullMQ",
        "Row-Level Locking",
        "REST APIs",
        "API Security",
      ],
    },
    {
      title: "Frontend & Interaction",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "DOM Manipulation",
        "Responsive Architecture",
        "WebSockets",
      ],
    },
    {
      title: "DevOps & Testing",
      skills: ["Docker", "Docker Compose", "Git / GitHub", "GitHub Actions", "Jest", "Supertest", "Linux"],
    },
  ] as SkillCategory[],
  achievements: [
    {
      headline: "300+ Solved Questions",
      platform: "LeetCode",
      detail: "Mastery of advanced algorithmic concepts, graph theory, priority queues, and dynamic programming.",
    },
    {
      headline: "3-Star Competitive Programmer",
      platform: "CodeChef",
      detail: "Demonstrated strong algorithmic problem-solving under real-time constraints.",
    },
  ],
};
