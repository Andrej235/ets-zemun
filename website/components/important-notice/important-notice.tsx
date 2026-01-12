import "./important-notice.scss";

function ImportantNotice() {
  return (
    <section className="important-notice">
      <div className="important-notice-announcement">
        <div>
          <h1>Obaveštenje o početku nastave</h1>
          <center>
            <p>
              U ponedeljak, <strong>19.01.2026.</strong>, učenici se vraćaju na
              nastavu prema sledećem rasporedu smena.
            </p>
          </center>
        </div>

        <div>
          <h2>Raspored smena</h2>
          <ul>
            <li>
              Prvi i treći razred – <strong>pre podne u 07:45</strong>
            </li>
            <li>
              Drugi i četvrti razred – <strong>poslepodne u 14:00</strong>
            </li>
          </ul>
        </div>

        <p>Molimo učenike da dođu u školu najmanje 10 minuta ranije.</p>

        <div className="important-notice-table">
          <table>
            <caption>Pregled po razredima</caption>
            <thead>
              <tr>
                <th>Razred</th>
                <th>Smena</th>
                <th>Vreme početka</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prvi i treći</td>
                <td>Pre podne</td>
                <td>07:45</td>
              </tr>
              <tr>
                <td>Drugi i četvrti</td>
                <td>Poslepodne</td>
                <td>14:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ImportantNotice;
