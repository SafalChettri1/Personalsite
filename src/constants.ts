import { Project, Experience, AcademicPaper } from './types';

export const PORTFOLIO_OWNER = {
  name: "S.M.",
  fullName: "Sudip Mahatara",
  headline: "I Build Things for the Web & Mobile",
  subtitle: "Full-stack developer crafting high-performance applications with a focus on AI integration and elegant user experiences.",
  profileImage: '/assets/profilepic.png',
  location: "Kathmandu, Nepal",
  degree: "Bachelors in Information Management (BIM)",
  experiencePeriod: "2+ Years Professional Engineering",
  email: "safalmahatara8848@gmail.com",
  recipientEmails: ["safalmahatara8848@gmail.com"],
  socialLinks: [
    { label: "Github", url: "https://github.com/SafalChettri1" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sudipmahatara" },
    // { label: "Read.cv", url: "https://read.cv/sudip-mahatara" },
    { label: "Twitter", url: "https://twitter.com/sudip_mahatara" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "omni-voice",
    title: "Omni-Voice",
    description: "Advanced voice synthesis and command center for localized language processing. Employs embedded whisper models to guarantee sub-50ms latency in air-gapped environments.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2vr-p-tjNcqrZrUozug3MTYGE1fckUVsZQ-ZzkF3Hw-w1P3etwnHs46mgaU75TyoezWDXMLynkaRxfIIZHZV_CsvsllBp9p46g4Va6PNvd4vGWLql17imEAfUfFHSVqiJTylaa1GGiSfO9gLh0t3aYxa2otBl7UirzXji_FCDMqBMN3BGXsXvqfvC7anWufdRq3JKjRdrJjXoHayADnEDO03SQWxmWn48t2E092nqFiTywElceQMnjIYry0lCq3VtifXykvgNgxI",
    tags: ["Kotlin", "OpenAI", "On-Device", "Audio Synth"],
    category: "web / mobile"
  },
  {
    id: "fitsense-ai",
    title: "FitSense AI",
    description: "Real-time posture correction and exercise tracking using on-device computer vision. Accelerates customized poseestimation models using neural engine cores on Android/iOS.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRpDWPlRmfhVi-9mG00gy-nDiIYAGfUU48aIONDBqSXay6V2QGHwgACYUuveOKHZp4YUL2n0hVVw-64G45lOXdCuR7zj60LU7n3KvMwt3nDRyvbJysSichgt4ZfeQQ5ZNGNdPxNp0QzhN-n8KJETrkAiLGY_-SZ6Dr1TsA_ss0nsH3s0DMl8yci-YzPEDZD_3Fr9puXqPZIjKojhoofKsfDPdSLHdWLn2TYTDLscwMTiBphMk42j1AboYi8dQkjezeQVLjqdmqJrY",
    tags: ["CMP", "TF Lite", "Computer Vision", "HealthTech"],
    category: "AI / ML, Mobile"
  },
  {
    id: "que-pay",
    title: "Que Pay",
    description: "Streamlined payment gateway for regional vendors with offline ledger support. Handles peer-to-peer offline receipts syncing with cryptographic hashes to prevent double spend.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApbwe3yD12Su6CDm5ISwNrLAMxK6YKr7ZRc5wdL2gm-oTlUsbIhSb-usPhMSk-bqQQvik0qLYL6w7C-3HlRwXUFji9reYMGLT28RHdQ00rUKe6DGet-zlv0ri5WViakAlwjZQlak_nFrL7yLynnnIsBbA0b_dFzMiwc6k8krcAZI0A0UoTneI0bLW5MoZOlDnL_yM4hBOLkHRtbQStRUcm8wWC-tIWOfLqH7oenecLKFsl54A2uwfP_ueCxPydt4hjwJqy-IvBpQo",
    tags: ["Kotlin", "Firebase", "Offline-First", "Crypto Ledger"],
    liveUrl: "https://play.google.com/store/apps/details?id=net.qpaysolutions.QPay",
    category: "Mobile"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    period: "2024 — PRESENT",
    role: "Software Engineer",
    company: "Que Pay Pvt. Ltd.",
    description: "Leading the mobile development team in creating a seamless financial ecosystem for regional markets. Optimized application performance, state transition delays, and image assets overhead.",
    details: [
      "Optimized app initialization performance by 40% using custom local caching layers.",
      "Engineered cryptographic offline ledger sync subsystem connecting dozens of active vendors.",
      "Architected real-time status update interfaces with full animations on Flutter and React."
    ]
  },
  {
    id: "exp-2",
    period: "2020 — 2025",
    role: "BIM Graduation",
    company: "Tribhuvan University",
    description: "Graduated with a focus on Information Management, software engineering fundamentals, database systems, and digital marketing strategies.",
    details: [
      "Specialized in high-load transactional systems and systems architecture.",
      "Published dual benchmarking studies about ambient on-device neural nets execution latency.",
      "Built over 15 client projects during academic terms across standard web stacks."
    ]
  }
];

export const ACADEMIC_PAPER: AcademicPaper = {
  id: "ieee-paper",
  title: "Benchmarking TensorFlow Lite vs. ML Kit",
  journal: "IEEE ACCESS / ACADEMIC RESEARCH",
  summary: "A exhaustive comparative study examining execution latency, memory footprint, and cumulative battery drain patterns in standard ambient on-device neural network frameworks.",
  url: "#",
  accentTag: "IEEE ACCESS APPROVED"
};

export const MARQUEE_ROW_1 = [
  { label: "Android Studio", icon: "Code" },
  { label: "Kotlin", icon: "Terminal" },
  { label: "Firebase", icon: "Cloud" },
  { label: "TensorFlow", icon: "Cpu" },
  { label: "Flutter", icon: "Play" },
];

export const MARQUEE_ROW_2 = [
  { label: "PostgreSQL", icon: "Database" },
  { label: "Node.js", icon: "Server" },
  { label: "Docker", icon: "Container" },
  { label: "GraphQL", icon: "Layers" },
  { label: "Git", icon: "GitBranch" },
];
