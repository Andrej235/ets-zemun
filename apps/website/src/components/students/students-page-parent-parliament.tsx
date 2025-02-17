export default function StudentsPageParentParliament() {
  const parentData = [
    {
      grade: "PRVI RAZRED",
      classes: [
        { className: "I1", parents: ["Ćosović Dragana"] },
        { className: "I2", parents: ["Dalibor Samardžić"] },
        { className: "I3", parents: ["Bajkić Dušan"] },
        { className: "I4", parents: ["Zoran Branković"] },
        { className: "I5", parents: ["Vladimir Rašović"] },
        { className: "I6", parents: ["Vesna Vuković"] },
        { className: "I7", parents: ["Neda Milanović"] },
        { className: "I8", parents: ["Stefanović Zlatko"] },
      ],
    },
    {
      grade: "DRUGI RAZRED",
      classes: [
        { className: "II1", parents: ["Marunić Zorica"] },
        { className: "II2", parents: ["Siniša Bazina"] },
        { className: "II3", parents: ["Goran Radović"] },
        { className: "II4", parents: ["Dejan Dragović"] },
        { className: "II5", parents: ["Olja Lazarac"] },
        { className: "II6", parents: ["Goran Živanović"] },
        { className: "II7", parents: ["Mitrović Aleksandar"] },
        { className: "II8", parents: ["Blagojević Dragi"] },
      ],
    },
    {
      grade: "TREĆI RAZRED",
      classes: [
        { className: "III1", parents: ["Bekrić Ljubica"] },
        { className: "III2", parents: ["Milena Lužija"] },
        { className: "III3", parents: ["Tatjana Ivanović"] },
        { className: "III4", parents: ["Dinić Nenad"] },
        { className: "III5", parents: ["Branko Ivošević"] },
        { className: "III6", parents: ["Bajunović Ivana"] },
        { className: "III7", parents: ["Jasmina Manigodić"] },
        { className: "III8", parents: ["Spasić Dragan"] },
      ],
    },
    {
      grade: "ČETVRTI RAZRED",
      classes: [
        { className: "IV1", parents: ["Mihajlović Aleksandar"] },
        { className: "IV2", parents: ["Jeina Mirjana"] },
        { className: "IV3", parents: ["Dimitrijević Ljiljana"] },
        { className: "IV4", parents: ["Galić Biljana"] },
        { className: "IV5", parents: ["Andreja Crnogorac"] },
        { className: "IV6", parents: ["Andrijana Perić Đurđević"] },
        { className: "IV7", parents: ["Stuparušić Marija"] },
      ],
    },
  ];

  return (
    <div className="parliament-container">
      <h1>Savet roditelja</h1>

      {parentData.map((gradeData, index) => (
        <div className="table-container" key={index + ""}>
          <table>
            <caption>{gradeData.grade}</caption>
            <thead>
              <tr>
                <th>Razred</th>
                <th>Roditelj</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.classes.map((classData, classIndex) => (
                <tr key={classIndex + ""}>
                  <td>{classData.className}</td>
                  <td>{classData.parents[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

