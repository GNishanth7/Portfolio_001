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
      "Led a college friend-team to build a facial recognition attendance prototype. Focused on data collection and cleaning for model training.",
    highlights: [
      "Selected for finals top 15 from 200+ teams",
      "Built practical OpenCV pipeline under time pressure",
      "Learned hackathon pacing and team coordination",
    ],
    lesson: "Speed matters, but clean data matters more.",
  },
  {
    id: "psg-medicult-hackathon",
    title: "Medicult National Hackathon Run",
    year: "2022",
    format: "Hackathon | 36h | Team of 5",
    summary:
      "Built an ambulance booking app with smartwatch anomaly trigger logic. Learned Android XML in real time during the event and shipped a working flow.",
    highlights: [
      "Reached top 100, then top 20 from 500+ teams",
      "Integrated mobile app, Firebase, and Python heartbeat checks",
      "Delivered under sleepless two-night sprint conditions",
    ],
    lesson: "Learning on demand is a competitive advantage.",
  },
  {
    id: "nutrition-mini-project",
    title: "Personalized Nutrition Mini Project",
    year: "2023",
    format: "Academic Project | Team of 4",
    summary:
      "Designed a content-based diet recommendation model and took ownership of delivery. Added Docker packaging and Streamlit UI to make reproducible usage easier.",
    highlights: [
      "Used nearest-neighbor style recommendation pipeline",
      "Containerized workflow for portable execution",
      "Balanced leadership and deep implementation work",
    ],
    lesson: "Reproducibility is part of product quality.",
  },
  {
    id: "visionary-final-year",
    title: "Final Year Generative Story Video Project",
    year: "2023-2024",
    format: "Final Year Project",
    summary:
      "Pivoted from pure text-to-video ambition to practical image-driven story video generation with summaries, PDF input, multilingual audio, and voice customization.",
    highlights: [
      "Built full architecture and shipped Gradio interface",
      "Expanded scope iteratively until submission deadline",
      "Explored add-on music pipeline as an extra milestone",
    ],
    lesson: "Creative pivots turn impossible ideas into shippable products.",
  },
  {
    id: "college-payment-integration",
    title: "Inter-College Event Payment Integration",
    year: "2024",
    format: "Department Project",
    summary:
      "Handled payment gateway integration responsibility for event booking software. Studied practical compliance constraints and implemented secure flows with major providers.",
    highlights: [
      "Integrated Paytm and Razorpay workflows",
      "Focused on transaction reliability and security",
      "Coordinated legal and compliance understanding",
    ],
    lesson: "Real products require technical and regulatory thinking together.",
  },
  {
    id: "trinity-captcha-project",
    title: "Trinity CAPTCHA Prediction",
    year: "2024",
    format: "Course Project | Team of 2",
    summary:
      "Worked on noisy CAPTCHA prediction with heavy preprocessing and model comparisons. Balanced team disagreement by running parallel model experiments and converging on stronger CTC-based performance.",
    highlights: [
      "Compared CNN, VGG, ViT, and CTC approaches",
      "Achieved best score in class",
      "Demonstrated evidence-based decision making",
    ],
    lesson: "Results settle architecture debates better than opinions.",
  },
  {
    id: "astroleo-scalable-computing",
    title: "AstroLEO Scalable Computing Project",
    year: "2024-2025",
    format: "Capstone | Team of 2",
    summary:
      "Built a secure satellite communication simulation with encryption and heartbeat failover despite being one of the smallest teams in the cohort.",
    highlights: [
      "Simulated five satellites with resilient routing",
      "Resolved presentation scheduling issue directly with faculty",
      "Finished with top score despite team-size disadvantage",
    ],
    lesson: "Clarity, persistence, and system thinking can outperform team size.",
  },
  {
    id: "distributed-traffic-booking-story",
    title: "Distributed Traffic Booking Build",
    year: "2025",
    format: "Team Project | Team of 5",
    summary:
      "Owned CockroachDB design and tuning for a distributed booking app with strict availability and fault tolerance goals.",
    highlights: [
      "Evaluated global distribution and automatic scaling behavior",
      "Ran iterative test cycles until architecture stabilized",
      "Turned repeated failures into a successful deployment path",
    ],
    lesson: "Systems mastery is built through stubborn iteration.",
  },
  {
    id: "pssqfl-dissertation-story",
    title: "PSSQFL Dissertation Origin Story",
    year: "2025",
    format: "Dissertation Research",
    summary:
      "Started late in topic allocation, then built a novel quantum federated learning direction after scanning 20+ papers and pushing beyond baseline designs.",
    highlights: [
      "Introduced secure and personalized slimmable QFL framing",
      "Diagnosed accuracy drops and redesigned personalization layer",
      "Produced strong final results with practical insight",
    ],
    lesson: "Research impact starts where uncertainty is highest.",
  },
  {
    id: "kittykat-internship-story",
    title: "KittyKat Internship in Production",
    year: "2025",
    format: "Industry Internship | 3 months",
    summary:
      "Contributed across collaboration tooling, chatbot memory fixes, and automation pipelines. Moved from prototype mindset to production shipping discipline.",
    highlights: [
      "Ran in daily standups and Jira-driven execution",
      "Built n8n pipelines for product image extraction and generation",
      "Improved moodboard relevance using MongoDB-driven metadata filtering",
    ],
    lesson: "Production engineering is about measurable reliability, not just demos.",
  },
];
