export type SearchEntry = {
  id: string;
  url: string;
  title: string;
  keywords: string;
};

export const searchMap: { entries: SearchEntry[] } = {
  entries: [
    {
      id: "o-nama",
      title: "searchKeys.about.title",
      keywords: "searchKeys.about.keywords",
      url: "/?searchKey=o-nama",
    },
    {
      id: "misija-i-vizija",
      keywords: "searchKeys.missionAndVision.keywords",
      title: "searchKeys.missionAndVision.title",
      url: "/?searchKey=misija-i-vizija",
    },
    {
      id: "takmicenja-i-nagrade",
      keywords: "searchKeys.awards.keywords",
      title: "searchKeys.awards.title",
      url: "/takmicenja?searchKey=takmicenja-i-nagrade",
    },
    {
      id: "dokumenta",
      keywords: "searchKeys.documents.keywords",
      title: "searchKeys.documents.title",
      url: "/dokumenta?searchKey=dokumenta",
    },
    {
      id: "upis-i-prijem",
      keywords: "searchKeys.enrollment.keywords",
      title: "searchKeys.enrollment.title",
      url: "/upis?searchKey=upis-i-prijem",
    },
    {
      id: "istorija",
      keywords: "searchKeys.history.keywords",
      title: "searchKeys.history.title",
      url: "/istorija?searchKey=istorija",
    },
    {
      id: "novosti",
      keywords: "searchKeys.news.keywords",
      title: "searchKeys.news.title",
      url: "/novosti?searchKey=novosti",
    },
    {
      id: "obrazovni-profili",
      keywords: "searchKeys.educationProfiles.keywords",
      title: "searchKeys.educationProfiles.title",
      url: "/profili?searchKey=obrazovni-profili",
    },
    {
      id: "nasilje",
      keywords: "searchKeys.bullying.keywords",
      title: "searchKeys.bullying.title",
      url: "/ucenici?searchKey=nasilje",
    },
    {
      id: "mentalno-zdravlje",
      keywords: "searchKeys.mentalHealth.keywords",
      title: "searchKeys.mentalHealth.title",
      url: "/ucenici?searchKey=mentalno-zdravlje",
    },
    {
      id: "savet-roditelja",
      keywords: "searchKeys.parentParliament.keywords",
      title: "searchKeys.parentParliament.title",
      url: "/ucenici?searchKey=savet-roditelja",
    },
    {
      id: "vanredni-ucenici",
      keywords: "searchKeys.partTimeStudents.keywords",
      title: "searchKeys.partTimeStudents.title",
      url: "/ucenici?searchKey=vanredni-ucenici",
    },
    {
      id: "ispiti",
      keywords: "searchKeys.exams.keywords",
      title: "searchKeys.exams.title",
      url: "/ucenici?searchKey=ispiti",
    },
    {
      id: "pp-sluzba",
      keywords: "searchKeys.ppService.keywords",
      title: "searchKeys.ppService.title",
      url: "/ucenici?searchKey=pp-sluzba",
    },
    {
      id: "ucenicki-parlament",
      keywords: "searchKeys.studentsParliament.keywords",
      title: "searchKeys.studentsParliament.title",
      url: "/ucenici?searchKey=ucenicki-parlament",
    },
    {
      id: "ucenici",
      keywords: "searchKeys.students.keywords",
      title: "searchKeys.students.title",
      url: "/ucenici?searchKey=ucenici",
    },
    {
      id: "nastavnici",
      keywords: "searchKeys.teachers.keywords",
      title: "searchKeys.teachers.title",
      url: "/nastavnici?searchKey=nastavnici",
    },
  ],
};
