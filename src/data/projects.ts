export interface Project {
  id: string;
  title: string;
  genre: string;
  description: string;
  longDescription: string;
  technologies: string[];
  challenges: string[];
  outcomes: string[];
  thumbnail: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "distributed-traffic-booking",
    title: "Traffic Booking Platform",
    genre: "Distributed Systems",
    description: "Global booking system for millions of users",
    longDescription: "Built a high-performance booking platform with fault-tolerant architecture. Uses CockroachDB for reliable transactions and Redis for fast caching. Handles traffic spikes smoothly with real-time updates.",
    technologies: ["CockroachDB", "Redis", "Docker", "Node.js"],
    challenges: ["Scale to millions", "Zero downtime", "No double bookings"],
    outcomes: ["99.9% uptime", "Sub-second response", "Global reach"],
    thumbnail: "/projects/traffic-booking.png",
    images: ["/projects/traffic-booking-1.png"],
    color: "#00ffff"
  },
  {
    id: "astro-leo",
    title: "Astro Leo",
    genre: "Satellite Networks",
    description: "P2P protocol for LEO satellite communication",
    longDescription: "Created a network protocol for satellites to communicate and share data in orbit. Enables real-time image transmission between satellites with AI-powered data processing and secure encryption.",
    technologies: ["Python", "Encryption", "Distributed Systems", "AI/ML"],
    challenges: ["Sync across orbit", "Secure links", "Smart routing"],
    outcomes: ["Real-time imaging", "Decentralized network", "Scalable design"],
    thumbnail: "/projects/astro-leo.png",
    images: ["/projects/astro-leo-1.png"],
    color: "#ff00ff"
  },
  {
    id: "visionary-ai",
    title: "Visionary AI",
    genre: "Generative AI",
    description: "Turn text into engaging videos automatically",
    longDescription: "AI platform that transforms written content into professional videos. Perfect for educators and content creators who want to make learning materials without video editing skills.",
    technologies: ["Python", "GenAI", "TensorFlow", "Streamlit"],
    challenges: ["Quality output", "Audio sync", "Fast processing"],
    outcomes: ["One-click videos", "Accessible learning", "Time saved"],
    thumbnail: "/projects/visionary-ai.png",
    images: ["/projects/visionary-ai-1.png"],
    color: "#ffff00"
  },
  {
    id: "pssqfl",
    title: "Quantum Fed Learning",
    genre: "Quantum ML Research",
    description: "Privacy-preserving ML for healthcare data",
    longDescription: "My Masters dissertation! Built a quantum machine learning system that lets hospitals train AI models together without sharing sensitive patient data. Combines quantum computing with federated learning.",
    technologies: ["Python", "PennyLane", "TensorFlow", "PyTorch"],
    challenges: ["Patient privacy", "Quantum optimization", "Model accuracy"],
    outcomes: ["Published research", "Better than classical ML", "Healthcare ready"],
    thumbnail: "/projects/pssqfl.png",
    images: ["/projects/pssqfl-1.png"],
    color: "#00ff00"
  },
  {
    id: "kittykat-platform",
    title: "KittyKat Platform",
    genre: "Enterprise Software",
    description: "Team collaboration with smart automation",
    longDescription: "Built during my internship at KittyKat (Singapore). Created an internal tool that helps teams communicate better and automated repetitive workflows to save hours of manual work.",
    technologies: ["Next.js", "N8N", "Docker", "Flask"],
    challenges: ["Team adoption", "Workflow design", "Integration"],
    outcomes: ["50% faster workflows", "Happy teams", "Less manual work"],
    thumbnail: "/projects/kittykat.png",
    images: ["/projects/kittykat-1.png"],
    color: "#ff6b6b"
  }
];

export const skills = [
  { name: "Python", score: 99999, maxScore: 99999 },
  { name: "Machine Learning", score: 95000, maxScore: 99999 },
  { name: "PyTorch/TensorFlow", score: 92000, maxScore: 99999 },
  { name: "JavaScript/Next.js", score: 88000, maxScore: 99999 },
  { name: "Distributed Systems", score: 85000, maxScore: 99999 },
  { name: "Data Science", score: 90000, maxScore: 99999 },
  { name: "Quantum Computing", score: 78000, maxScore: 99999 },
];

export const profile = {
  name: "Nishanth Gopinath",
  title: "Data Scientist & AI/ML Engineer",
  avatar: "/avatar.png",
  bio: "A fresh Computer Science graduate specializing in Data Science from Trinity College Dublin. Passionate about machine learning, predictive modelling, and building impactful AI solutions. Eager to apply my academic knowledge and project experience to real-world challenges. Published researcher in AI healthcare applications.",
  stats: {
    level: 1,
    experience: "Fresher",
    projectsCompleted: 8,
    coffeesConsumed: 1500,
    bugsSquashed: 2847
  },
  equipment: [
    { name: "Primary Weapon", item: "Python + PyTorch" },
    { name: "Armor", item: "TensorFlow Keras" },
    { name: "Shield", item: "Docker Containers" },
    { name: "Mount", item: "Git + CI/CD" }
  ],
  achievements: [
    { title: "Best Paper Award", description: "AI Healthcare CNN research publication" },
    { title: "Masters Graduate", description: "Trinity College Dublin - Data Science" },
    { title: "Quantum Pioneer", description: "Developed PSSQFL framework" },
    { title: "Published Researcher", description: "DOI: 10.1063/5.0254700" }
  ],
  contact: {
    email: "Nishanthgopi2002@gmail.com",
    github: "https://github.com/GNishanth7",
    linkedin: "https://www.linkedin.com/in/nishanth-gopinath/"
  }
};
