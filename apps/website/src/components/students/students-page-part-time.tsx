export default function StudentsPagePartTime() {
  const deadlines = [
    {
      term: "OKTOBARSKI",
      registration: "09-27.09.2024.",
      exam: "07-31.10.2024.",
    },
    {
      term: "DECEMBARSKI",
      registration: "04-22.11.2024.",
      exam: "02-27.12.2024.",
    },
    {
      term: "MARTOVSKI",
      registration: "03-21.02.2025.",
      exam: "03-28.03.2025.",
    },
    {
      term: "MAJSKI",
      registration: "01-25.04.2025.",
      exam: "12-30.05.2025.",
    },
    {
      term: "AVGUSTOVSKI",
      registration: "02-20.06.2025.",
      exam: "18-29.08.2025.",
    },
  ];

  const priceList = [
    { itemName: "UPIS GODINE", itemPrice: "7.500,00 din." },
    { itemName: "OBNOVA GODINE", itemPrice: "1.500,00 din." },
    { itemName: "ISPIT SA PISMENIM RADOM", itemPrice: "1.000,00 din." },
    { itemName: "ISPIT BEZ PISMENOG", itemPrice: "1.000,00 din." },
    { itemName: "ISPIT IZ PRAKTIČNE NASTAVE", itemPrice: "1.000,00 din." },
    { itemName: "ISPIT SA VEŽBAMA", itemPrice: "1.000,00 din." },
    { itemName: "ZAVRŠNI ISPIT", itemPrice: "2.500,00 din." },
    { itemName: "MATURSKI ISPIT", itemPrice: "3.000,00 din." },
  ];

  const examData = [
    {
      subject: "SRPSKI JEZIK-maturski",
      commission: [
        "Srđan Gagić",
        "Nada Đurić",
        "Marina Ristanović",
        "Vurdelja Dejan",
        "Radmila Vidović",
      ],
      date: "Utorak, 28.01.2025.",
      time: "14.45, 10.30",
      cabinet: "17 ili 18",
    },
    {
      subject: "STRUČNO TEORIJSKI ISPIT (ARM, IT, ER)",
      commission: ["Bogdan Luković", "Anđela Pavlović"],
      date: "Sreda, 29.01.2025.",
      time: "10.00",
      cabinet: "14",
    },
    {
      subject: "STRUČNO TEORIJSKI ISPIT (ARM, IT, ER)",
      commission: ["Slavica Per", "Relja Ćurčin", "Vesna Janjić"],
      date: "Sreda, 29.01.2025.",
      time: "15.35",
      cabinet: "14",
    },
    {
      subject: "PRAKTIČNI ISPIT-ARM-A",
      commission: ["Slavica Per", "Saša Stošić"],
      date: "Četvrtak, 30.01.2025.",
      time: "11.15",
      cabinet: "44",
    },
    {
      subject: "PRAKTIČNI ISPIT-ARM-B",
      commission: ["Slavica Per", "Saša Stošić"],
      date: "petak, 31.01.2025.",
      time: "13.00",
      cabinet: "43",
    },
    {
      subject: "PRAKTIČNI ISPIT-ER-A",
      commission: ["Radovan Đurić", "Saviša Nikolić"],
      date: "Četvrtak, 30.01.2025.",
      time: "14.00",
      cabinet: "43",
    },
    {
      subject: "PRAKTIČNI ISPIT-ER-B",
      commission: ["Radovan Đurić", "Slaviša Nikolić"],
      date: "petak, 31.01.2025.",
      time: "14.45",
      cabinet: "43",
    },
    {
      subject: "PRAKTIČNI ISPIT-IT-A",
      commission: ["Galina Bojović", "Relja Ćurčin"],
      date: "Četvrtak, 30.01.2025.",
      time: "11.25",
      cabinet: "50",
    },
    {
      subject: "PRAKTIČNI ISPIT-IT-B",
      commission: ["Galina Bojović", "Relja Ćurčin"],
      date: "petak, 31.01.2025.",
      time: "12.10",
      cabinet: "50",
    },
    {
      subject: "SERVISER TERMIČKIH I RASHLADNIH UREĐAJA",
      commission: ["Branko Lončar", "Mavrak Milenko"],
      date: "31.01.2025.",
      time: "14.00",
      cabinet: "73",
    },
    {
      subject: "MATURSKI ISPIT (elektrotehničar automatike)",
      commission: ["Cvija Jelenković", "Vesna Janjić", "Branislav Siljković"],
      date: "30.01.2025., 31.01.2025.",
      time: "13.00, 14.00",
      cabinet: "40",
    },
  ];

  return (
    <div className="part-time-container">
      <div className="table-container">
        <table>
          <caption>
            ROKOVI ZA VANREDNE UČENIKE U ŠKOLSKOJ 2024/2025.GODINI
          </caption>
          <thead>
            <tr>
              <th>ROKOVI</th>
              <th>PRIJAVLJIVANJA</th>
              <th>POLAGANJA</th>
            </tr>
          </thead>
          <tbody>
            {deadlines.map((deadline, index) => (
              <tr key={index + ""}>
                <td>{deadline.term}</td>
                <td>{deadline.registration}</td>
                <td>{deadline.exam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="price-list">
        <h2>CENOVNIK VANREDNOG ŠKOLOVANjA ZA ŠKOLSKU 2024/2025.GODINU</h2>
        {priceList.map((item, index) => (
          <div className="price-list-item" key={index + ""}>
            <div className="item-name">{item.itemName}</div>
            <div className="item-price">{item.itemPrice}</div>
          </div>
        ))}
      </div>

      <div className="payment-method">
        <h2>RAČUN ZA UPLATU ZA VANREDNE UČENIKE</h2>
        <p>840-31302845-09</p>
        <p>OBAVEZNO:</p>
        <p>POZIV NA BROJ:</p>
        <p>97 06601832040174231700</p>
      </div>

      <div className="table-container">
        <table className="part-time-table">
          <caption>
            MATURSKI/ZAVRŠNI ISPIT U DECEMBARSKO/JANUARSKOM ROKU
          </caption>
          <thead>
            <tr>
              <th>PREDMET</th>
              <th>KOMISIJA</th>
              <th>DATUM POLAGANjA</th>
              <th>VREME POLAGANjA</th>
              <th>KABINET</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam, index) => (
              <tr key={index + ""}>
                <td>{exam.subject}</td>
                <td>{exam.commission.join(", ")}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.cabinet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

