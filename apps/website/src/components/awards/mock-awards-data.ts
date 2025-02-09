export type Award = {
  id: number;
  title: string;
  competition: string;
  year: number;
  category: string;
  students: string[];
  teachers: number[]; // Ids of faculty profiles
  description: string;
  image: string;
  projectSummary?: string;
  externalLink?: string; // e.g., competition website
};

export const awards: Award[] = [
  {
    id: 1,
    title: "Best Software Project",
    competition: "National Coding Challenge",
    year: 2023,
    category: "Software Development",
    students: ["Marko Jovanović", "Ana Petrović"],
    teachers: [101, 102],
    description:
      "A web application for task management with AI-based suggestions.",
    image: "https://picsum.photos/200/300?random=1",
    projectSummary:
      "An intelligent task management tool that optimizes productivity.",
    externalLink: "https://codingchallenge.com",
  },
  {
    id: 2,
    title: "Robotics Innovation Award",
    competition: "European Robotics Cup",
    year: 2022,
    category: "Robotics",
    students: ["Ivan Milenković", "Jovana Stanić"],
    teachers: [103],
    description: "An autonomous robot designed for warehouse logistics.",
    image: "https://picsum.photos/200/300?random=2",
    projectSummary:
      "A self-navigating robot that increases efficiency in warehouses.",
    externalLink: "https://roboticscup.eu",
  },
  {
    id: 3,
    title: "Game Development Champion",
    competition: "Global Game Jam",
    year: 2024,
    category: "Game Development",
    students: ["Nikola Popović", "Mila Ilić"],
    teachers: [104, 105],
    description: "A pixel-art adventure game with AI-generated story elements.",
    image: "https://picsum.photos/200/300?random=3",
    projectSummary:
      "An engaging indie game blending AI-generated storytelling with platforming.",
    externalLink: "https://globalgamejam.org",
  },
  {
    id: 4,
    title: "Cybersecurity Excellence Award",
    competition: "CyberSec Challenge",
    year: 2023,
    category: "Cybersecurity",
    students: ["Stefan Vasić"],
    teachers: [106],
    description:
      "Developed a new encryption algorithm to enhance data security.",
    image: "https://picsum.photos/200/300?random=4",
    externalLink: "https://cybersec-challenge.com",
  },
  {
    id: 5,
    title: "AI Research Recognition",
    competition: "International AI Symposium",
    year: 2021,
    category: "Artificial Intelligence",
    students: ["Luka Živković", "Sara Nikolić"],
    teachers: [107, 108],
    description: "A study on AI-driven medical diagnostics.",
    image: "https://picsum.photos/200/300?random=5",
    projectSummary: "Explored the potential of AI in early disease detection.",
  },
  {
    id: 6,
    title: "Web Design Award",
    competition: "Frontend Masters Challenge",
    year: 2022,
    category: "Web Development",
    students: ["Petar Ristić", "Katarina Đorđević"],
    teachers: [109],
    description: "Designed a visually stunning and accessible web platform.",
    image: "https://picsum.photos/200/300?random=6",
    externalLink: "https://frontendmasters.com",
  },
  {
    id: 7,
    title: "Best IoT Solution",
    competition: "Smart Tech Innovations",
    year: 2023,
    category: "Internet of Things",
    students: ["Jovan Stevanović", "Dunja Pavlović"],
    teachers: [110, 111],
    description: "Developed a smart home automation system.",
    image: "https://picsum.photos/200/300?random=7",
    projectSummary:
      "IoT-based home automation for energy efficiency and convenience.",
  },
  {
    id: 8,
    title: "Hackathon Winner",
    competition: "Codefest 2024",
    year: 2024,
    category: "Software Engineering",
    students: ["Nemanja Stanković", "Teodora Ivković"],
    teachers: [112],
    description: "Built an innovative app for real-time disaster response.",
    image: "https://picsum.photos/200/300?random=8",
    externalLink: "https://codefest.org",
  },
  {
    id: 9,
    title: "Best Data Science Project",
    competition: "Data Science Summit",
    year: 2023,
    category: "Data Science",
    students: ["Vanja Aleksić"],
    teachers: [113, 114],
    description: "A machine learning model for predicting financial trends.",
    image: "https://picsum.photos/200/300?random=9",
    projectSummary:
      "Used deep learning to forecast stock market trends with high accuracy.",
  },
  {
    id: 10,
    title: "Green Tech Award",
    competition: "Sustainable Future Challenge",
    year: 2022,
    category: "Environmental Technology",
    students: ["Aleksandar Lukić", "Nina Božić"],
    teachers: [115],
    description: "A self-sustaining energy system using solar and wind power.",
    image: "https://picsum.photos/200/300?random=10",
    externalLink: "https://sustainablefuture.org",
  },
];

