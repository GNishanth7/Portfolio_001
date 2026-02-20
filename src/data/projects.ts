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
    id: "supplier-quotation-rag-pipeline",
    title: "Supplier Quotation RAG Pipeline",
    genre: "Applied GenAI",
    description: "I built a multi-agent RAG workflow that turns supplier PDFs into clean quote tables.",
    longDescription:
      "At KittyKat, I kept seeing procurement teams lose time in manual PDF review. I built an end-to-end pipeline with OCR, embeddings, FAISS retrieval, and LLM extraction so messy quotations become structured fields the team can compare quickly.",
    technologies: ["Python", "FastAPI", "RAG", "FAISS", "Docker"],
    challenges: [
      "Handling scanned and inconsistent supplier PDF formats",
      "Keeping extracted fields aligned to one schema",
      "Reducing hallucinations in final LLM answers",
    ],
    outcomes: [
      "Cut manual quote review effort on our internal test set",
      "Built a reusable retrieval plus extraction API service",
      "Packaged the workflow in Docker for quick team onboarding",
    ],
    thumbnail: "/projects/rag-pipeline.png",
    images: ["/projects/rag-pipeline-1.png"],
    color: "#22d3ee",
  },
  {
    id: "personalized-nutrition-advisor",
    title: "Personalized Nutrition Advisor",
    genre: "Machine Learning Product",
    description: "I shipped a meal recommendation app based on nutritional similarity instead of generic diet lists.",
    longDescription:
      "This started as a mini-project and I took it end-to-end: nearest-neighbor model, FastAPI backend, Streamlit frontend, and Docker packaging so teammates could run the same setup without environment friction.",
    technologies: ["Python", "Scikit-learn", "FastAPI", "Streamlit", "Docker"],
    challenges: [
      "Cold start behavior for users with little preference history",
      "Cleaning inconsistent nutrition labels in raw datasets",
      "Keeping model, API, and UI behavior in sync",
    ],
    outcomes: [
      "Delivered personalized meal suggestions with explainable similarity",
      "Created a stable local deployment flow through Docker",
      "Built a cleaner UX for testing recommendations quickly",
    ],
    thumbnail: "/projects/nutrition-advisor.png",
    images: ["/projects/nutrition-advisor-1.png"],
    color: "#34d399",
  },
  {
    id: "face-attendance-tracker",
    title: "Face Attendance Tracker",
    genre: "Computer Vision",
    description: "My first hackathon build: a face attendance system trained on data we collected ourselves.",
    longDescription:
      "In a 36-hour hackathon, I handled dataset collection and cleaning while our team built the recognition pipeline. We used OpenCV with HOG-based detection and CNN classification to create a working classroom attendance prototype.",
    technologies: ["Python", "OpenCV", "TensorFlow", "CNN", "HOG"],
    challenges: ["Lighting changes in real classrooms", "Pose variation and partial face views", "Small starter dataset"],
    outcomes: [
      "Built a real-time attendance proof-of-concept",
      "Improved robustness through augmentation and preprocessing",
      "Reached top 15 finals from 200+ teams",
    ],
    thumbnail: "/projects/face-attendance.png",
    images: ["/projects/face-attendance-1.png"],
    color: "#f59e0b",
  },
  {
    id: "medicult-ambulance-app",
    title: "Medicult Ambulance App",
    genre: "Mobile + IoT",
    description: "In 36 hours, we built an ambulance app that can trigger dispatch from abnormal heart-rate signals.",
    longDescription:
      "For HackFest, we combined Android booking flows, Firebase storage, and Arduino smartwatch data. I learned Android XML on the spot and helped wire anomaly checks so repeated risky heart-rate readings could trigger emergency dispatch logic.",
    technologies: ["Android Studio", "Java", "Firebase", "Python", "Arduino"],
    challenges: [
      "Maintaining real-time event flow across devices and app state",
      "Filtering noisy heartbeat signals before trigger logic",
      "Shipping a complete Android flow under hackathon pressure",
    ],
    outcomes: [
      "Shipped a working emergency response prototype",
      "Shortlisted in top 25 at HackFest 2022",
      "Improved my mobile and IoT integration speed",
    ],
    thumbnail: "/projects/medicult.png",
    images: ["/projects/medicult-1.png"],
    color: "#fb7185",
  },
  {
    id: "linguarails-smart-yatra",
    title: "LinguaRails: Smart Yatra",
    genre: "Speech AI",
    description: "A multilingual rail assistant prototype for speech recognition, translation, and language routing.",
    longDescription:
      "This project focused on reducing language friction in railway systems. I worked on a transformer-based speech pipeline with language identification, translation, and transcript-quality filtering so mixed-language noisy speech could still be handled reliably.",
    technologies: ["PyTorch", "Transformer", "SeamlessM4T", "Flask", "Diffusers"],
    challenges: ["Limited labeled data for several languages", "Maintaining quality across language switches", "Speech-text alignment noise"],
    outcomes: [
      "Built a single pipeline for recognition plus translation tasks",
      "Improved transcript quality with automatic filtering",
      "Produced a practical concept for inclusive travel support",
    ],
    thumbnail: "/projects/linguarails.png",
    images: ["/projects/linguarails-1.png"],
    color: "#60a5fa",
  },
  {
    id: "visionary-ai",
    title: "Visionary AI Story Generator",
    genre: "Generative AI",
    description: "I turned a hard text-to-video idea into a practical story-video generator with voice and subtitle controls.",
    longDescription:
      "This was my final-year project. I began with an ambitious text-to-video goal, then pivoted to an image-driven storytelling pipeline I could ship properly. I added summarization, PDF input, multilingual narration, subtitle rendering, and voice customization in Gradio.",
    technologies: ["Python", "Gradio", "NLP", "GenAI", "TTS"],
    challenges: ["Orchestrating multiple GenAI and media steps", "Keeping subtitle and audio timing aligned", "Controlling scope close to submission deadline"],
    outcomes: [
      "Delivered a full end-to-end educational storytelling prototype",
      "Handled fast iterations without breaking baseline stability",
      "Built a strong product-ownership case study",
    ],
    thumbnail: "/projects/visionary-ai.png",
    images: ["/projects/visionary-ai-1.png"],
    color: "#eab308",
  },
  {
    id: "pssqfl",
    title: "Personalized Secure Slimmable QFL",
    genre: "Quantum ML Research",
    description: "Dissertation project where I proposed a personalized, secure, slimmable quantum federated setup.",
    longDescription:
      "I entered this topic with only basic quantum background, reviewed 20+ papers, and identified a gap around secure, personalized slimmable design in quantum federated settings. I implemented the framework and fixed training collapse caused by heterogeneous hospital client data.",
    technologies: ["Python", "PennyLane", "Federated Learning", "Quantum ML", "PyTorch"],
    challenges: [
      "Training instability after several communication rounds",
      "Non-IID behavior across different hospital datasets",
      "Defending novelty in a research setting",
    ],
    outcomes: [
      "Improved convergence with a personalization layer",
      "Delivered strong dissertation results and evaluation",
      "Produced an original contribution combining three research lines",
    ],
    thumbnail: "/projects/pssqfl.png",
    images: ["/projects/pssqfl-1.png"],
    color: "#a78bfa",
  },
  {
    id: "astro-leo",
    title: "AstroLEO Protocol",
    genre: "Distributed Systems",
    description: "A two-person build of encrypted satellite communication with heartbeat failover and rerouting.",
    longDescription:
      "In a class where most teams had 4-5 members, we built a full simulation of five LEO satellites. I focused on secure inter-node communication, heartbeat monitoring, and failover routing so data transfer stayed reliable when nodes dropped.",
    technologies: ["Python", "ChaCha20", "P2P Networking", "Distributed Simulation"],
    challenges: [
      "Designing failover behavior that actually converged",
      "Maintaining secure links across distributed nodes",
      "Delivering high-scope work with a small team",
    ],
    outcomes: [
      "Demonstrated resilient routing across simulated failures",
      "Achieved top score in the class",
      "Built a strong distributed-systems case study",
    ],
    thumbnail: "/projects/astro-leo.png",
    images: ["/projects/astro-leo-1.png"],
    color: "#2dd4bf",
  },
  {
    id: "distributed-traffic-booking",
    title: "Distributed Traffic Booking",
    genre: "Scalable Systems",
    description: "I owned the distributed database layer for a fault-tolerant traffic booking platform.",
    longDescription:
      "Our team needed high availability with no single point of failure. I chose CockroachDB, learned it deeply from docs, tuned replication behavior, and kept testing failure scenarios until booking flow stayed stable under pressure.",
    technologies: ["CockroachDB", "Docker", "Node.js", "Distributed Systems"],
    challenges: ["Keeping consistency under distributed load", "Tuning replication without hurting latency", "Designing reliable failover behavior"],
    outcomes: [
      "Delivered reliable distributed persistence for core workflows",
      "Improved team confidence in scale and recovery behavior",
      "Finished with a stable, test-backed team delivery",
    ],
    thumbnail: "/projects/traffic-booking.png",
    images: ["/projects/traffic-booking-1.png"],
    color: "#06b6d4",
  },
  {
    id: "kittykat-platform",
    title: "KittyKat Internship Projects",
    genre: "Product Engineering",
    description: "Three-month internship where I shipped production fixes across collaboration, chatbot memory, and automation.",
    longDescription:
      "I worked directly in a production environment with daily standups and Jira execution. I contributed to designer collaboration workflows, fixed onboarding memory behavior in chatbot prompts, and built n8n automation pipelines using MongoDB metadata filtering for campaign relevance.",
    technologies: ["Next.js", "n8n", "MongoDB", "Prompt Engineering", "Automation"],
    challenges: ["Handling production constraints and release pressure", "Switching context between platform and AI tasks", "Filtering high-noise campaign metadata correctly"],
    outcomes: [
      "Shipped improvements that reached production use",
      "Improved moodboard image relevance for campaigns",
      "Gained hands-on product engineering discipline",
    ],
    thumbnail: "/projects/kittykat.png",
    images: ["/projects/kittykat-1.png"],
    color: "#f97316",
  },
];

export const skills = [
  { name: "Python", score: 95, maxScore: 100 },
  { name: "Machine Learning", score: 92, maxScore: 100 },
  { name: "Generative AI + RAG", score: 89, maxScore: 100 },
  { name: "Distributed Systems", score: 84, maxScore: 100 },
  { name: "PyTorch / TensorFlow", score: 90, maxScore: 100 },
  { name: "API + Backend Engineering", score: 86, maxScore: 100 },
  { name: "Cloud / Containers", score: 80, maxScore: 100 },
];

export const profile = {
  name: "Nishanth Gopinath",
  title: "AI Engineer | ML Systems Builder",
  avatar: "/avatar.png",
  bio: "Data Science graduate from Trinity College Dublin. I like building AI products end-to-end, from model experiments to real workflows that people can actually use.",
  stats: {
    level: 2,
    experience: "Early career",
    projectsCompleted: 10,
    coffeesConsumed: 1800,
    bugsSquashed: 3200,
  },
  equipment: [
    { name: "Core Stack", item: "Python + PyTorch + FastAPI" },
    { name: "Model Tooling", item: "TensorFlow + Scikit-learn" },
    { name: "Infra", item: "Docker + Distributed Databases" },
    { name: "Workflow", item: "Git + Jira + Product Iteration" },
  ],
  achievements: [
    { title: "Top Hackathon Finishes", description: "Reached final rounds in multiple national hackathons" },
    { title: "Research Contributor", description: "Built and defended a quantum federated learning dissertation" },
    { title: "Production Internship", description: "Shipped fixes and automation in a live product environment" },
    { title: "Best Class Performance", description: "Highest score in advanced CAPTCHA modeling coursework" },
  ],
  contact: {
    email: "nishanthgopi2002@gmail.com",
    github: "https://github.com/GNishanth7",
    linkedin: "https://www.linkedin.com/in/nishanth-gopinath/",
  },
};
