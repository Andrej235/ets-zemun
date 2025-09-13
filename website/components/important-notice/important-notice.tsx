import "./important-notice.scss";

function ImportantNotice() {
  return (
    <section className="important-notice">
      <div className="important-notice-announcement">
        <div>
          <h1>Naslov</h1>
          <p>Tekst</p>
        </div>

        <div>
          <h2>Naslov</h2>
          <ul>
            <li>Tekst</li>
            <li>Tekst</li>
          </ul>
        </div>

        <p>Tekst</p>
        <div className="important-notice-table">
          <table>
            <caption>Razred</caption>
            <thead>
              <tr>
                <th>Obrazovni profil</th>
                <th>Odeljenski staresina</th>
                <th>Odeljenski staresina</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>dasdasd</td>
                <td>dasdasd</td>
                <td>dasdasd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ImportantNotice;
