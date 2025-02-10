import "./enrollment.scss";

export default function Enrollment() {
  return (
    <div className="enrollment-page">
      <h1>Upis i Prijemni ispit</h1>
      <h2>Postanite deo naše zajednice budućih elektrotehničara!</h2>

      <div className="timeline">
        <div className="card">
          <h1>21.03. и 22.03.2025. године</h1>
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

      <div className="call-to-action">
        <p>Prijavite se online do 25. juna!</p>

        <a href="https://mojasrednjaskola.gov.rs/" target="_blank">
          Prijavi se
        </a>
      </div>
    </div>
  );
}

