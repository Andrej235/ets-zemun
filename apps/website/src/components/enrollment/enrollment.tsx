import Icon from "@components/icon/icon";
import "./enrollment.scss";

const programs = [
  {
    name: "Elektrotehničar računara",
    duration: "4 godine",
    students: 90,
    requiredPoints: 85,
  },
  {
    name: "Elektronika",
    duration: "4 godine",
    students: 60,
    requiredPoints: 78,
  },
  {
    name: "Telekomunikacije",
    duration: "3 godine",
    students: 30,
    requiredPoints: 75,
  },
  {
    name: "Energetika",
    duration: "4 godine",
    students: 45,
    requiredPoints: 80,
  },
];

export default function Enrollment() {
  return (
    <div className="enrollment-page">
      <h1>Upis i Prijemni ispit</h1>
      <h2>Postanite deo naše zajednice budućih elektrotehničara!</h2>

      <div className="timeline">
        <div className="card">
          <h1>21.03. i 22.03.2025. године</h1>
          <p>Пробни завршни испит</p>
        </div>

        <div className="card">
          <h1>од 16.06. до 18.06.2025.</h1>
          <p>Полагање завршног испита</p>
        </div>

        <div className="card">
          <h1>24.06. и 25.06.2025.</h1>
          <p>Попуњавање листе опредељења (жеља) за упис у средњу школу</p>
        </div>

        <div className="card">
          <h1>28.06.2025.</h1>
          <p>Објављивање коначних резултата расподеле по средњим школама</p>
        </div>
      </div>

      <div className="enrollment-table">
        <div className="card">
          <table>
            <caption>Programi upisa</caption>
            <thead>
              <tr>
                <th>Smer</th>
                <th>Trajanje</th>
                <th>Broj učenika</th>
                <th>Potrebni bodovi</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={index + ""}>
                  <td>{program.name}</td>
                  <td>{program.duration}</td>
                  <td>{program.students}</td>
                  <td>{program.requiredPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="call-to-action">
        <p>Prijavite se online do 25. juna!</p>

        <a href="https://mojasrednjaskola.gov.rs/" target="_blank">
          <button>
            <p>Prijavi se</p>
            <Icon name="arrow-right" className="button-icon" />
          </button>
        </a>
      </div>
    </div>
  );
}

