export default function StudentsPageStudentParliament() {
  const studentsData = [
    {
      grade: "PRVI RAZRED",
      classes: [
        { className: "1/1", students: ["Subotić Miloš", "Čodanović Ognjen"] },
        { className: "1/2", students: ["Jovana Đerić", "Lazar Lotina"] },
        { className: "1/3", students: ["Žižović Ognjen", "Tairovski Ognjen"] },
        {
          className: "1/4",
          students: ["Anastasija Stanojković", "Vitomir Vlada Mihajlović"],
        },
        {
          className: "1/5",
          students: ["Jovičić Aleksandra", "Popović Milica"],
        },
        { className: "1/6", students: ["Luka Jeremić", "Stefan Marković"] },
        {
          className: "1/7",
          students: ["Janković Mateja", "Milutinović Filip"],
        },
        { className: "1/8", students: ["Aliti Davor", "Perić Uroš"] },
      ],
    },
    {
      grade: "DRUGI RAZRED",
      classes: [
        { className: "2/1", students: ["Anđela Cvejtić", "Ana Simonović"] },
        {
          className: "2/2",
          students: ["Aleksandra Ćuksanovski", "Filip Kovačević"],
        },
        { className: "2/3", students: ["Novak Sekulić", "Vuk Spasić"] },
        { className: "2/4", students: ["Prokić Vukašin", "Karaica Marko"] },
        { className: "2/5", students: ["Dinić Branko", "Aleksa Andželić"] },
        { className: "2/6", students: ["Jelena Simić", "Jovan Čolić"] },
        { className: "2/7", students: ["Đureković Andrijana", "Mirko Čikara"] },
        { className: "2/8", students: ["Ivanović Stefan", "Stefanović Zoran"] },
      ],
    },
    {
      grade: "TREĆI RAZRED",
      classes: [
        { className: "3/1", students: ["Olivera Glišić", "Tamara Žujić"] },
        { className: "3/2", students: ["Nikola Arsić", "Lazar Živanović"] },
        { className: "3/3", students: ["Mateja Marković", "Veljko Živanović"] },
        { className: "3/4", students: ["Ćetković Milica", "Džekić Teodora"] },
        { className: "3/5", students: ["Puzović Lazar", "Lukić Andrej"] },
        {
          className: "3/6",
          students: ["Viktor Bogdanović Abazi", "Nikola Radosavljević"],
        },
        { className: "3/7", students: ["Sava Lukić", "David Somonji"] },
        { className: "3/8", students: ["Jovanović Strahinja", "Stanić Vanja"] },
      ],
    },
    {
      grade: "ČETVRTI RAZRED",
      classes: [
        { className: "4/1", students: ["Uroš Nikolić", "Nikola Štrk"] },
        { className: "4/2", students: ["Jovan Bogdanović", "Ivana Jeina"] },
        {
          className: "4/3",
          students: ["Anđela Dimitrijević", "Nikolija Sofornijević"],
        },
        { className: "4/4", students: ["Teodora Malešić", "Mihajlica David"] },
        { className: "4/5", students: ["Uroš Mićunović", "Aleksa Ob etković"] },
        {
          className: "4/6",
          students: ["Veljki Grujičić", "Milošević Aleksandar"],
        },
        { className: "4/7", students: ["Mateja Đukić", "Nina Ristić"] },
      ],
    },
  ];

  return (
    <div className="parliament-container">
      <h1>Učenički parlament</h1>

      {studentsData.map((gradeData, index) => (
        <div className="year-table" key={index + ""}>
          <table>
          <caption>{gradeData.grade}</caption>
            <thead>
              <tr>
                <th>Razred</th>
                <th>Ucenik 1</th>
                <th>Ucenik 2</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.classes.map((classData, classIndex) => (
                <tr key={classIndex + ""}>
                  <td>{classData.className}</td>
                  <td>{classData.students[0]}</td>
                  <td>{classData.students[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

