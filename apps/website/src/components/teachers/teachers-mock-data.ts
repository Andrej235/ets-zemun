type Faculty = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  qualifications: string[];
  subjects: string[];
  department: string;
  officeHours: { day: string; time: string }[];
  contact: {
    email: string;
    officeLocation: string;
  };
  achievements?: string[];
  socialLinks?: {
    linkedIn?: string;
    researchGate?: string;
  };
};

export const teachersMockData: Faculty[] = [
  {
    id: "1",
    name: "Marko Petrović",
    title: "Profesor sistema automatizacije",
    bio: "Sa više od 15 godina iskustva u industrijskoj automatizaciji, prof. Petrović se specijalizovao za PLC programiranje i robotiku. Mentor je studentima za nacionalna takmičenja u robotici.",
    imageUrl: "/images/faculty/marko-petrovic.jpg",
    qualifications: [
      "Doktorat iz automatizacije (Univerzitet u Beogradu)",
      "Sertifikovani Siemens inženjer automatizacije",
    ],
    subjects: ["PLC programiranje", "Industrijska robotika"],
    department: "Automatizacija i robotika",
    officeHours: [
      { day: "Ponedeljak", time: "10:00-12:00" },
      { day: "Sreda", time: "14:00-16:00" },
    ],
    contact: {
      email: "marko.petrovic@eskola.rs",
      officeLocation: "Zgrada A, Soba 205",
    },
    achievements: [
      "Vodio studentski tim do prvog mesta na Balkanskom prvenstvu u robotici 2023.",
    ],
    socialLinks: {
      linkedIn: "linkedin.com/in/marko-petrovic-automation",
    },
  },
  {
    id: "2",
    name: "Ana Jovanović",
    title: "Viši predavač računarskih mreža",
    bio: "Stručnjak za sigurnost mreža i cloud infrastrukturu. Bivši mrežni administrator u Telekomu Srbija.",
    imageUrl: "/images/faculty/ana-jovanovic.jpg",
    qualifications: [
      "Master iz računarstva (Univerzitet u Novom Sadu)",
      "Cisco CCNP sertifikat",
    ],
    subjects: ["Sigurnost mreža", "Cloud računarstvo"],
    department: "Računarske mreže",
    officeHours: [
      { day: "Utorak", time: "09:00-11:00" },
      { day: "Četvrtak", time: "13:00-15:00" },
    ],
    contact: {
      email: "ana.jovanovic@eskola.rs",
      officeLocation: "Zgrada B, Soba 104",
    },
    achievements: [
      "Dizajnirala laboratoriju za sajber bezbednost škole uz finansiranje EU grantom",
    ],
  },
  {
    id: "3",
    name: "Nikola Ilić",
    title: "Šef odseka za elektrotehniku",
    bio: "Specijalizovan za sisteme obnovljive energije i pametne mreže. Strastven prema održivom inženjeringu.",
    imageUrl: "/images/faculty/nikola-ilic.jpg",
    qualifications: [
      "Doktorat iz elektrotehnike (Univerzitet u Nišu)",
      "Sertifikovani menadžer energije",
    ],
    subjects: ["Sistemi obnovljive energije", "Distribucija energije"],
    department: "Elektrotehnika",
    officeHours: [
      { day: "Ponedeljak", time: "13:00-15:00" },
      { day: "Petak", time: "10:00-12:00" },
    ],
    contact: {
      email: "nikola.ilic@eskola.rs",
      officeLocation: "Zgrada C, Soba 301",
    },
    achievements: ["Saradnja sa EPS-om na pilot projektu solarne energije"],
    socialLinks: {
      researchGate: "researchgate.net/profile/nikola-ilic",
    },
  },
  {
    id: "4",
    name: "Jelena Stanković",
    title: "Profesor ugrađenih sistema",
    bio: "Fokusira se na IoT i programiranje mikrokontrolera. Vodi inovacionu laboratoriju za IoT škole.",
    imageUrl: "/images/faculty/jelena-stankovic.jpg",
    qualifications: [
      "Master iz elektronike (Univerzitet u Beogradu)",
      "Sertifikovani ARM inženjer",
    ],
    subjects: ["Ugrađeni sistemi", "IoT aplikacije"],
    department: "Automatizacija i robotika",
    officeHours: [{ day: "Sreda", time: "09:00-11:00" }],
    contact: {
      email: "jelena.stankovic@eskola.rs",
      officeLocation: "Zgrada A, Soba 210",
    },
    achievements: ["Koautor udžbenika o Arduino programiranju"],
  },
  {
    id: "5",
    name: "Dragan Milić",
    title: "Predavač digitalne elektronike",
    bio: "Stručnjak za dizajn FPGA i VHDL. Bivši inženjer za istraživanje i razvoj u RT-RK institutu.",
    imageUrl: "/images/faculty/dragan-milic.jpg",
    qualifications: [
      "Diplomirani inženjer elektronike (Univerzitet u Banja Luci)",
      "Sertifikat za Xilinx FPGA",
    ],
    subjects: ["Digitalna elektronika", "VHDL programiranje"],
    department: "Elektrotehnika",
    officeHours: [{ day: "Četvrtak", time: "14:00-16:00" }],
    contact: {
      email: "dragan.milic@eskola.rs",
      officeLocation: "Zgrada C, Soba 305",
    },
  },
  {
    id: "6",
    name: "Ivana Vasić",
    title: "Profesor programiranja",
    bio: "Predaje Python, C++ i web razvoj. Zagovornik za žene u tehnologiji.",
    imageUrl: "/images/faculty/ivana-vasic.jpg",
    qualifications: [
      "Master iz softverskog inženjeringa (Univerzitet u Novom Sadu)",
      "Microsoft sertifikovani trener",
    ],
    subjects: ["Python programiranje", "Web razvoj"],
    department: "Računarske mreže",
    officeHours: [
      { day: "Utorak", time: "10:00-12:00" },
      { day: "Petak", time: "09:00-11:00" },
    ],
    contact: {
      email: "ivana.vasic@eskola.rs",
      officeLocation: "Zgrada B, Soba 112",
    },
    achievements: ["Osnovala školski Girls Code Club"],
  },
  {
    id: "7",
    name: "Miloš Đorđević",
    title: "Viši inženjer robotike",
    bio: "Specijalizovan za automatizaciju robotskih procesa (RPA) i integraciju AI.",
    imageUrl: "/images/faculty/milos-djordjevic.jpg",
    qualifications: [
      "Doktorat iz robotike (Univerzitet u Beogradu)",
      "ABB sertifikat za robotiku",
    ],
    subjects: ["Automatizacija robotskih procesa", "Osnovi AI"],
    department: "Automatizacija i robotika",
    officeHours: [{ day: "Sreda", time: "15:00-17:00" }],
    contact: {
      email: "milos.djordjevic@eskola.rs",
      officeLocation: "Zgrada A, Soba 215",
    },
    socialLinks: {
      linkedIn: "linkedin.com/in/milos-djordjevic-robotics",
    },
  },
  {
    id: "8",
    name: "Sanja Popović",
    title: "Predavač električnih kola",
    bio: "Fokusira se na dizajn kola i rešavanje problema. Vodi praktične radionice za početnike.",
    imageUrl: "/images/faculty/sanja-popovic.jpg",
    qualifications: [
      "Diplomirani inženjer elektrotehnike (Univerzitet u Kragujevcu)",
    ],
    subjects: ["Dizajn kola", "Električna merenja"],
    department: "Elektrotehnika",
    officeHours: [
      { day: "Ponedeljak", time: "08:00-10:00" },
      { day: "Četvrtak", time: "12:00-14:00" },
    ],
    contact: {
      email: "sanja.popovic@eskola.rs",
      officeLocation: "Zgrada C, Soba 302",
    },
  },
  {
    id: "9",
    name: "Stefan Marković",
    title: "Specijalista za mrežnu infrastrukturu",
    bio: "Stručnjak za Cisco mreže i administraciju servera. Upravlja data centrom škole.",
    imageUrl: "/images/faculty/stefan-markovic.jpg",
    qualifications: [
      "CCNA sertifikat",
      "Master iz IT (Univerzitet u Beogradu)",
    ],
    subjects: ["Cisco mreže", "Administracija servera"],
    department: "Računarske mreže",
    officeHours: [{ day: "Petak", time: "13:00-15:00" }],
    contact: {
      email: "stefan.markovic@eskola.rs",
      officeLocation: "Zgrada B, Soba 108",
    },
  },
  {
    id: "10",
    name: "Tamara Nikolić",
    title: "Profesor matematike za inženjere",
    bio: "Predaje primenjenu matematiku za elektrotehničke discipline.",
    imageUrl: "/images/faculty/tamara-nikolic.jpg",
    qualifications: [
      "Doktorat iz primenjene matematike (Univerzitet u Novom Sadu)",
    ],
    subjects: ["Inženjerska matematika", "Statistika"],
    department: "Elektrotehnika",
    officeHours: [{ day: "Utorak", time: "14:00-16:00" }],
    contact: {
      email: "tamara.nikolic@eskola.rs",
      officeLocation: "Zgrada C, Soba 303",
    },
    achievements: ["Razvila program obuke za matematičku olimpijadu škole"],
  },
];

