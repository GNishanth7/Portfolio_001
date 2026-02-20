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
    description: "Multi-agent quotation processing with retrieval-augmented generation",
    longDescription:
      "Built an end-to-end retrieval and extraction pipeline for supplier quotation documents. Combined OCR, embeddings, FAISS retrieval, and LLM reasoning to turn unstructured quotations into structured procurement insights with faster turnaround and reduced manual review.",
    technologies: ["Python", "FastAPI", "RAG", "FAISS", "Docker"],
    challenges: ["Noisy PDFs", "Schema alignment", "Reliable extraction"],
    outcomes: ["Faster quote analysis", "Reusable retrieval layer", "Production-ready API"],
    thumbnail: "/projects/rag-pipeline.png",
    images: ["/projects/rag-pipeline-1.png"],
    color: "#22d3ee",
  },
  {
    id: "personalized-nutrition-advisor",
    title: "Personalized Nutrition Advisor",
    genre: "Machine Learning Product",
    description: "Content-based diet recommendation platform",
    longDescription:
      "Developed a recommendation engine for healthier food choices using nearest neighbors over nutritional profiles. Served model inference through FastAPI, built an interactive Streamlit interface, and containerized the stack with Docker for easy deployment and reproducibility.",
    technologies: ["Python", "Scikit-learn", "FastAPI", "Streamlit", "Docker"],
    challenges: ["Cold start recommendations", "Dataset quality", "End-to-end deployment"],
    outcomes: ["Personalized meal suggestions", "Stable local deployment", "Improved user experience"],
    thumbnail: "/projects/nutrition-advisor.png",
    images: ["/projects/nutrition-advisor-1.png"],
    color: "#34d399",
  },
  {
    id: "face-attendance-tracker",
    title: "Face Attendance Tracker",
    genre: "Computer Vision",
    description: "Facial identification for attendance tracking",
    longDescription:
      "Created a face-based attendance system using OpenCV, HOG, and CNN classification. Built and cleaned a custom dataset, performed augmentation for better generalization, and shipped a reliable prototype for real-time classroom attendance scenarios.",
    technologies: ["Python", "OpenCV", "TensorFlow", "CNN", "HOG"],
    challenges: ["Lighting variation", "Pose variance", "Small dataset"],
    outcomes: ["Real-time recognition", "Improved model robustness", "Top 15 in hackathon finals"],
    thumbnail: "/projects/face-attendance.png",
    images: ["/projects/face-attendance-1.png"],
    color: "#f59e0b",
  },
  {
    id: "medicult-ambulance-app",
    title: "Medicult Ambulance App",
    genre: "Mobile + IoT",
    description: "Ambulance dispatch linked with heart-rate anomalies",
    longDescription:
      "Built a 36-hour hackathon prototype of an ambulance booking app inspired by ride-hailing UX. Integrated smartwatch heart-rate signals through Arduino and anomaly detection to trigger emergency dispatch logic and nearest-vehicle routing.",
    technologies: ["Android Studio", "Java", "Firebase", "Python", "Arduino"],
    challenges: ["Real-time event flow", "Signal quality", "Fast mobile integration"],
    outcomes: ["Top 25 in HackFest 2022", "Working emergency prototype", "Stronger mobile engineering skills"],
    thumbnail: "/projects/medicult.png",
    images: ["/projects/medicult-1.png"],
    color: "#fb7185",
  },
  {
    id: "linguarails-smart-yatra",
    title: "LinguaRails: Smart Yatra",
    genre: "Speech AI",
    description: "Multilingual speech and translation assistant for railways",
    longDescription:
      "Designed a multilingual speech pipeline for railway contexts with speech recognition, language identification, and translation. Used transformer-based approaches and quality filtering to handle noisy transcripts while improving inclusivity for diverse language users.",
    technologies: ["PyTorch", "Transformer", "SeamlessM4T", "Flask", "Diffusers"],
    challenges: ["Low-resource labels", "Multilingual quality", "Speech alignment"],
    outcomes: ["Unified speech workflow", "Higher transcript quality", "Inclusive travel assistant concept"],
    thumbnail: "/projects/linguarails.png",
    images: ["/projects/linguarails-1.png"],
    color: "#60a5fa",
  },
  {
    id: "visionary-ai",
    title: "Visionary AI Story Generator",
    genre: "Generative AI",
    description: "Turn text and PDFs into visual story videos",
    longDescription:
      "Started as a final year text-to-video idea and evolved into a full visual storytelling pipeline. Added summarization, multilingual voice, subtitle rendering, PDF ingestion, and voice customization to produce educational video stories with a fast interface.",
    technologies: ["Python", "Gradio", "NLP", "GenAI", "TTS"],
    challenges: ["Pipeline orchestration", "Audio timing", "Feature creep under deadline"],
    outcomes: ["End-to-end working prototype", "Creative product iteration", "Strong ownership story"],
    thumbnail: "/projects/visionary-ai.png",
    images: ["/projects/visionary-ai-1.png"],
    color: "#eab308",
  },
  {
    id: "pssqfl",
    title: "Personalized Secure Slimmable QFL",
    genre: "Quantum ML Research",
    description: "Dissertation on secure personalized quantum federated learning",
    longDescription:
      "Proposed and implemented a personalized secure slimmable quantum federated learning framework for healthcare scenarios. Combined slimmable FL ideas with security layers and personalization to address convergence instability on heterogeneous client data.",
    technologies: ["Python", "PennyLane", "Federated Learning", "Quantum ML", "PyTorch"],
    challenges: ["Training instability", "Heterogeneous hospital data", "Research novelty"],
    outcomes: ["High dissertation score", "Improved accuracy stability", "Original research contribution"],
    thumbnail: "/projects/pssqfl.png",
    images: ["/projects/pssqfl-1.png"],
    color: "#a78bfa",
  },
  {
    id: "astro-leo",
    title: "AstroLEO Protocol",
    genre: "Distributed Systems",
    description: "P2P satellite communication and failover simulation",
    longDescription:
      "Built a simulation of five low-earth-orbit satellites with encrypted communication, heartbeat-based failover, and decentralized routing. Focused on resilience, data continuity, and reliable transfer to ground systems under node failure conditions.",
    technologies: ["Python", "ChaCha20", "P2P Networking", "Distributed Simulation"],
    challenges: ["Failover reliability", "Secure inter-node communication", "Small team constraints"],
    outcomes: ["Best score in class", "Robust failover behavior", "Clear systems engineering narrative"],
    thumbnail: "/projects/astro-leo.png",
    images: ["/projects/astro-leo-1.png"],
    color: "#2dd4bf",
  },
  {
    id: "distributed-traffic-booking",
    title: "Distributed Traffic Booking",
    genre: "Scalable Systems",
    description: "Fault-tolerant booking system with no single point of failure",
    longDescription:
      "Delivered a distributed booking architecture emphasizing high availability and fault tolerance. Led CockroachDB setup and tuning for globally distributed transactions, then validated resilience behavior under failure and traffic stress scenarios.",
    technologies: ["CockroachDB", "Docker", "Node.js", "Distributed Systems"],
    challenges: ["Consistency at scale", "Replication tuning", "Service resilience"],
    outcomes: ["Reliable distributed persistence", "Improved scale confidence", "Successful team delivery"],
    thumbnail: "/projects/traffic-booking.png",
    images: ["/projects/traffic-booking-1.png"],
    color: "#06b6d4",
  },
  {
    id: "kittykat-platform",
    title: "KittyKat Internship Projects",
    genre: "Product Engineering",
    description: "Collaboration workflows, chatbot fixes, and automation pipelines",
    longDescription:
      "Contributed across multiple product tracks during a three-month internship: collaborative designer workflows, chatbot memory improvements through prompt/system changes, and n8n image automation pipelines connected to production data and MongoDB filtering logic.",
    technologies: ["Next.js", "n8n", "MongoDB", "Prompt Engineering", "Automation"],
    challenges: ["Production constraints", "Fast context switching", "Data relevance filtering"],
    outcomes: ["Working production improvements", "Better campaign image relevance", "Hands-on product development experience"],
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
  title: "AI Engineer | ML Builder | Systems Explorer",
  avatar: "/avatar.png",
  bio: "Data Science graduate from Trinity College Dublin focused on applied AI, machine learning systems, and product-driven experimentation. I enjoy turning ambitious ideas into practical demos, then hardening them into reliable workflows.",
  stats: {
    level: 2,
    experience: "Early career",
    projectsCompleted: 12,
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
    { title: "Top Hackathon Finishes", description: "Final rounds across multiple national events" },
    { title: "Research Contributor", description: "Quantum federated learning dissertation work" },
    { title: "Production Internship", description: "Delivered fixes and automation at KittyKat" },
    { title: "Best Class Performance", description: "Top score in advanced CAPTCHA modeling project" },
  ],
  contact: {
    email: "nishanthgopi2002@gmail.com",
    github: "https://github.com/GNishanth7",
    linkedin: "https://www.linkedin.com/in/nishanth-gopinath/",
  },
};
