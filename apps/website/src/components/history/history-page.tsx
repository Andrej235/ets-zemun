import { useMemo } from "react";
import History from "./history";
import HistorySegment from "./history-segment";

export default function HistoryPage() {
  const history = useMemo(
    () => (
      <History
        timelineConfig={{
          animateOnlyOnce: true,
          corderArcRadius: 15,
          timelineStyle: {
            "1000px": "left",
            "500px": "right",
            "1020px": "middle",
          },
        }}
      >
        <HistorySegment date={"1887. godina"}>
          <h1>Osnivanje prve tehničke škole u Zemunu</h1>
          <div className="history-segment-description">
            <p>
              Osnivanje prve stručne škole u Zemunu predstavlja početak
              obrazovanja u specijalizovanim tehničkim disciplinama.
            </p>
            <p>
              Ova škola je dala je značajan doprinos obrazovanju budućih
              inženjera i tehničara u regionu. U ovom periodu, škola je započela
              sa učenjem tehničkih veština koje su bile potrebne za industrijski
              razvoj tog vremena.
            </p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1949. godina"}>
          <h1>Premestanje u novu zgradu</h1>
          <div className="history-segment-description">
            <p>
              U 1949. godini, škola je preselila u novu zgradu koja se nalazila
              u ulici Nade Dimić. Ova zgrada bila je savremeno opremljena za to
              vreme i omogućila je bolje uslove za nastavu.
            </p>
            <p>
              Škola je tada dobila i internat, što je omogućilo da se u njoj
              obrazuju i učenici iz drugih delova Jugoslavije, čime je škola
              postala važan centar za tehničku edukaciju u zemlji.
            </p>
          </div>
        </HistorySegment>

        <HistorySegment date={new Date("05.10.1954.")}>
          <h1>Promena naziva u "Majstorska škola metalske struke"</h1>
          <div className="history-segment-description">
            <p>
              Dana 5. oktobra 1954. godine, škola je zvanično promenila naziv u
              "Majstorska škola metalske struke u Zemunu".
            </p>
            <p>
              Ova promena odražavala je širenje obrazovnih profila prema
              potrebama metaloprerađivačke industrije, koja je bila u porastu u
              to vreme.
            </p>
            <p>
              Programi su bili fokusirani na obučavanje majstora i radnika za
              metalnu industriju, pružajući im specifične veštine potrebne za
              rad u toj oblasti.
            </p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1960. godina"}>
          <h1>
            Promena naziva u "Metaloprerađivačka škola za učenike u privredi"
          </h1>
          <div className="history-segment-description">
            <p>
              Godine 1960. škola menja naziv u "Metaloprerađivačku školu za
              učenike u privredi", čime je postala još specijalizovanija u
              obrazovanju učenika za industrijske sektore.
            </p>
            <p>
              Škola je tada upisivala 600 učenika, čime je postala ključna
              obrazovna institucija u regionu.
            </p>
            <p>
              Nastavni plan i program obuhvatao je ne samo metalnu industriju,
              već i elektrotehniku i druge tehničke oblasti, što je omogućilo
              učenicima da steknu širok spektar veština.
            </p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1980. godina"}>
          <h1>Preimenovanje u "Mašinski obrazovni centar"</h1>
          <div className="history-segment-description">
            <p>
              Godine 1980. škola je preimenovana u "Mašinski obrazovni centar",
              što je označilo širenje obrazovnih profila i uvođenje novih
              disciplina u oblasti mašinske industrije.
            </p>
            <p>
              Škola je počela da se fokusira i na obrazovanje u oblastima
              automatike i mehanike, sa ciljem da učenici steknu napredna znanja
              i praktične veštine za rad u savremenoj industriji. Takođe, tokom
              ovog perioda škola je usavršavala svoje laboratorije i radionice.
            </p>
          </div>
        </HistorySegment>

        <HistorySegment date={"1987. godina"}>
          <h1>Promena naziva u "Mašinska škola Zemun"</h1>
          <div className="history-segment-description">
            <p>
              1987. godine, škola je promenila naziv u "Mašinska škola Zemun",
              što je odražavalo njen stalni razvoj i rast u okviru mašinske
              industrije.
            </p>
            <p>
              Škola je u ovom periodu postala vodeća obrazovna institucija u
              Zemunu za obuku tehničara i inženjera, pružajući učenicima
              kvalitetno obrazovanje koje je bilo u skladu sa potrebama
              industrije.
            </p>
          </div>
        </HistorySegment>

        <HistorySegment date={new Date("01.04.2003")}>
          <h1>Preimenovanje u Elektrotehnička škola 'Zemun'</h1>
          <div className="history-segment-description">
            <p>
              U aprilu 2003. godine, škola je dobila naziv "Elektrotehnička
              škola 'Zemun'", čime je jasno označila svoju specijalizaciju u
              oblasti elektrotehnike, informatike i savremenih tehnologija.
            </p>
            <p>
              Ova promena je usledila kao odgovor na ubrzani tehnološki napredak
              i potrebu za obrazovanjem stručnjaka u oblasti računarskih nauka,
              elektronike, automatizacije i drugih modernih tehničkih
              disciplina.
            </p>
            <p>
              Škola je nastavila da pruža obrazovanje i pripremu za tržište
              rada, nudeći savremene programe i resurse za svoje učenike.
            </p>
          </div>
        </HistorySegment>
      </History>
    ),
    []
  );

  return history;
}

