export interface JourneyStory {
  id: string;
  title: string;
  year: string;
  format: string;
  summary: string;
  highlights: string[];
  lesson: string;
}

export const journeyStories: JourneyStory[] = [
  {
    id: "kings-college-face-hackathon",
    title: "Face Attendance Hackathon",
    year: "2022",
    format: "Hackathon | 36h | Team of 4",
    summary:
      "This was my first major hackathon. I pulled together a team of friends and took ownership of data collection and cleanup for our face-attendance model.",
    highlights: [
      "Selected for finals top 15 from 200+ teams",
      "Built practical OpenCV pipeline under time pressure",
      "Learned hackathon pacing and team coordination",
    ],
    lesson: "I learned fast that clean data beats flashy modeling.",
  },
  {
    id: "psg-medicult-hackathon",
    title: "Medicult National Hackathon Run",
    year: "2022",
    format: "Hackathon | 36h | Team of 5",
    summary:
      "We built an ambulance booking app linked with smartwatch anomaly detection. I had to learn Android XML live during the event and still ship.",
    highlights: [
      "Reached top 100, then top 20 from 500+ teams",
      "Integrated mobile app, Firebase, and Python heartbeat checks",
      "Delivered under sleepless two-night sprint conditions",
    ],
    lesson: "When time is tight, learning on demand becomes a superpower.",
  },
  {
    id: "nutrition-mini-project",
    title: "Personalized Nutrition Mini Project",
    year: "2023",
    format: "Academic Project | Team of 4",
    summary:
      "I built a diet recommendation model and pushed hard to make it usable, not just correct. Docker and Streamlit helped us run it consistently.",
    highlights: [
      "Used nearest-neighbor style recommendation pipeline",
      "Containerized workflow for portable execution",
      "Balanced leadership and deep implementation work",
    ],
    lesson: "If people cannot run it, it is not finished.",
  },
  {
    id: "visionary-final-year",
    title: "Final Year Generative Story Video Project",
    year: "2023-2024",
    format: "Final Year Project",
    summary:
      "I started with a too-ambitious text-to-video idea, then pivoted into something shippable: image-driven story videos with summaries, PDF input, and multilingual narration.",
    highlights: [
      "Built full architecture and shipped Gradio interface",
      "Expanded scope iteratively until submission deadline",
      "Explored add-on music pipeline as an extra milestone",
    ],
    lesson: "A good pivot can save a project without killing the vision.",
  },
  {
    id: "college-payment-integration",
    title: "Inter-College Event Payment Integration",
    year: "2024",
    format: "Department Project",
    summary:
      "I handled payment gateway integration for our inter-college event platform, including security and compliance checks before launch.",
    highlights: [
      "Integrated Paytm and Razorpay workflows",
      "Focused on transaction reliability and security",
      "Coordinated legal and compliance understanding",
    ],
    lesson: "Product work is technical, legal, and operational at the same time.",
  },
  {
    id: "trinity-captcha-project",
    title: "Trinity CAPTCHA Prediction",
    year: "2024",
    format: "Course Project | Team of 2",
    summary:
      "We tackled noisy CAPTCHA prediction and compared multiple model families. I pushed for experiment-driven decisions when our team disagreed on architecture.",
    highlights: [
      "Compared CNN, VGG, ViT, and CTC approaches",
      "Achieved best score in class",
      "Demonstrated evidence-based decision making",
    ],
    lesson: "Data settles debates faster than opinions.",
  },
  {
    id: "astroleo-scalable-computing",
    title: "AstroLEO Scalable Computing Project",
    year: "2024-2025",
    format: "Capstone | Team of 2",
    summary:
      "My teammate and I built secure satellite communication simulation with failover logic, even though we were one of the smallest teams in class.",
    highlights: [
      "Simulated five satellites with resilient routing",
      "Resolved presentation scheduling issue directly with faculty",
      "Finished with top score despite team-size disadvantage",
    ],
    lesson: "A small team can beat bigger teams with focus and execution.",
  },
  {
    id: "distributed-traffic-booking-story",
    title: "Distributed Traffic Booking Build",
    year: "2025",
    format: "Team Project | Team of 5",
    summary:
      "I owned CockroachDB design and tuning for a distributed booking app where uptime and fault tolerance were non-negotiable.",
    highlights: [
      "Evaluated global distribution and automatic scaling behavior",
      "Ran iterative test cycles until architecture stabilized",
      "Turned repeated failures into a successful deployment path",
    ],
    lesson: "Distributed systems click only after repeated failure and tuning cycles.",
  },
  {
    id: "pssqfl-dissertation-story",
    title: "PSSQFL Dissertation Origin Story",
    year: "2025",
    format: "Dissertation Research",
    summary:
      "I started late on topic allocation, read a large set of papers fast, and shaped a dissertation direction in secure personalized quantum federated learning.",
    highlights: [
      "Introduced secure and personalized slimmable QFL framing",
      "Diagnosed accuracy drops and redesigned personalization layer",
      "Produced strong final results with practical insight",
    ],
    lesson: "The best research direction usually starts where things feel unclear.",
  },
  {
    id: "kittykat-internship-story",
    title: "KittyKat Internship in Production",
    year: "2025",
    format: "Industry Internship | 3 months",
    summary:
      "During my internship, I worked on collaboration tooling, chatbot memory fixes, and automation pipelines that touched production data.",
    highlights: [
      "Ran in daily standups and Jira-driven execution",
      "Built n8n pipelines for product image extraction and generation",
      "Improved moodboard relevance using MongoDB-driven metadata filtering",
    ],
    lesson: "Production engineering is measured by reliability, not demo quality.",
  },
];
