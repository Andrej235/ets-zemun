import Icon from "@components/icon/icon";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export default function ProfilesPageSection() {
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState<number | null>(null);
  const subjectsContainerRef = useRef<HTMLUListElement>(null);

  function handleSelectSubject(idx: number) {
    setSelectedSubjectIdx((prev) => (prev === idx ? null : idx));
  }

  useEffect(() => {
    if (!subjectsContainerRef.current || selectedSubjectIdx === null) return;

    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");

    subjectsContainerRef.current.children[
      selectedSubjectIdx
    ].insertAdjacentElement("afterend", placeholder);

    const selectedSubject = subjectsContainerRef.current.children[
      selectedSubjectIdx
    ] as HTMLElement;

    selectedSubject.style.top = placeholder.offsetTop + "px";
    selectedSubject.style.height = placeholder.offsetHeight + "px";
    selectedSubject.style.width = placeholder.offsetWidth + "px";

    return () => {
      selectedSubject.style.top = "";
      selectedSubject.style.height = "";
      selectedSubject.style.width = "";

      placeholder.remove();
    };
  }, [subjectsContainerRef, selectedSubjectIdx]);

  return (
    <div className="profiles-page-section">
      <div className="header">
        <div className="image-container">
          <img src="/placeholder.jpg" alt="Placeholder" />
        </div>

        <div className="info">
          <h1>Elektrotehnicar informacionih tehnologija</h1>

          <p>
            Elektrotehničar informacionih tehnologija je savremeni obrazovni
            profil osmišljen za učenike koji žele da se specijalizuju u oblasti
            informacionih tehnologija, koja predstavlja osnovu današnjeg
            digitalnog društva.
          </p>

          <p>
            Nakon završetka školovanja, učenici su spremni da nastave
            obrazovanje na fakultetima tehničkih usmerenja ili da započnu
            karijeru u IT industriji na pozicijama poput junior programera,
            mrežnog tehničara ili administratora baza podataka.
          </p>
        </div>
      </div>

      <div className="body">
        <h3>
          Tokom četvorogodišnjeg školovanja, učenici se upoznavaju sa širokim
          spektrom znanja i veština iz oblasti programiranja, mrežnih
          tehnologija, baza podataka i računarskog hardvera. Ova znanja
          uključuju:
        </h3>

        <ul className="skills">
          <li>Rad sa savremenim programskim jezicima</li>

          <li>Kreiranje statičkih i dinamičkih web stranica</li>

          <li>Kreiranje i konfigurisanje softverskih aplikacija</li>

          <li>Dizajn i implementacija baza podataka</li>

          <li>Projektovanje, konfiguracija, i održavanje računarskih mreža</li>

          <li>Razumevanje principa rada računarskih komponenti i uređaja</li>
        </ul>

        <h3>
          Pored tehničkih veština, učenici razvijaju i analitičko razmišljanje,
          sposobnost rešavanja problema, i timski rad, što su ključni preduslovi
          za uspeh u IT sektoru. Nastava je osmišljena da kombinuje teoriju i
          praksu, a škola poseduje savremeno opremljene kabinete i laboratorije
          koje omogućavaju učenicima da stečeno znanje odmah primene kroz
          praktične zadatke i projekte. Kljucni strucni predmeti ovog smera
          predstavljaju:
        </h3>

        <ul className="subjects" ref={subjectsContainerRef}>
          <SubjectItem
            idx={0}
            selectedSubjectIdx={selectedSubjectIdx}
            handleSelectSubject={handleSelectSubject}
            icon="square-binary"
            title="Programiranje"
            longDescription="U prve dve godine skolovanja programiranje obuhvata uvod u algoritme i sablone programiranja, kao i osnove jezika C. Nakon naucenih osnova, djacima se predstavlja jezik C# kojim razvijaju konzolne i desktop aplikacije ostatak skolovanja u .NET okruzenju"
            shortDescription="Razvijanje konzolnih i desktop aplikacija u jeziku C# i .NET okruzenju"
          />

          <SubjectItem
            idx={1}
            selectedSubjectIdx={selectedSubjectIdx}
            handleSelectSubject={handleSelectSubject}
            icon="code"
            title="Web programiranje"
            longDescription="Web dizajn i web programiranje zajedno obuhvataju razne tehnologije i alate potrebne za kreiranje web stranica. Ovde djaci uce da koriste HTML, CSS i JavaScript ukljucujuci i biblioteku jquery"
            shortDescription="Kreiranje statičkih i dinamičkih web stranica koristeći HTML, CSS, JavaScript i jQuery"
          />

          <SubjectItem
            idx={2}
            selectedSubjectIdx={selectedSubjectIdx}
            handleSelectSubject={handleSelectSubject}
            icon="database"
            title="Baze podataka"
            longDescription="Baze podataka pruzaju ucenicima mogucnost dizajniranja, kreiranja i upravljanja realisticnim bazama podataka koristeci SQL. Ovaj predmet takodje obuhvata najbolje prakse koje treba da se prate prilikom rada sa bazama podataka radi najboljih rezultata"
            shortDescription="Dizajn i implementacija baza podataka koristeći SQL"
          />

          <SubjectItem
            idx={3}
            selectedSubjectIdx={selectedSubjectIdx}
            handleSelectSubject={handleSelectSubject}
            icon="shield-halved"
            title="ZIS"
            longDescription="Zastita informacionih tehnologija pokazuje kako zastiti sebe, ali i svoje projekte od napada i neovlašćenog pristupa. Pored teorije, djaci imaju priliku da se upoznaju za alatima kao sto je CryptTool i Linux operativnim sistemom"
            shortDescription="Zastita informacionih tehnologija i upoznavanje sa alatima kao sto su CryptTool i Linux"
          />

          <SubjectItem
            idx={4}
            selectedSubjectIdx={selectedSubjectIdx}
            handleSelectSubject={handleSelectSubject}
            icon="cubes-stacked"
            title="PIT"
            longDescription="Primenjene informacione tehnologije kombinuju svo znanje steceno u ostalim strucnim predmetima i da ga iskoriste za kreiranje full stack desktop i web aplikacija kroz izradu zajednickih projekata koristeci C# ASP.NET Web Forme, C# WPF i SQL"
            shortDescription="Kreiranje full stack desktop i web aplikacija koristeci C# ASP.NET Web Forme, C# WPF i SQL"
          />
        </ul>

        <h3>
          Elektrotehničar informacionih tehnologija je idealan izbor za sve koji
          žele da budu deo dinamičnog i perspektivnog sveta informacionih
          tehnologija.
        </h3>

        <Link
          to={"/profili/elektrotehnicar-informacionih-tehnologija"}
          className="learn-more"
        >
          Saznaj vise
        </Link>
      </div>
    </div>
  );
}

type SubjectItemProps = {
  readonly idx: number;
  readonly selectedSubjectIdx: number | null;
  readonly handleSelectSubject: (idx: number) => void;
  readonly icon: string;
  readonly title: string;
  readonly longDescription: string;
  readonly shortDescription: string;
};

function SubjectItem({
  idx,
  selectedSubjectIdx,
  handleSelectSubject,
  icon,
  title,
  longDescription,
  shortDescription,
}: SubjectItemProps) {
  return (
    <motion.li
      layout
      style={{
        position: selectedSubjectIdx === idx ? "absolute" : "relative",
      }}
      className={selectedSubjectIdx === idx ? "selected" : undefined}
      animate={{
        zIndex: selectedSubjectIdx === idx ? 10 : 0,
        transition: {
          delay: selectedSubjectIdx === idx ? 0 : 0.5,
          duration: 0.5,
        },
      }}
    >
      <button onClick={() => handleSelectSubject(idx)} key={`it-subject-${idx}`}>
        <Icon name={icon} />
        <span className="title">{title}</span>
      </button>

      <div className="description-container">
        <span className="description long">{longDescription}</span>
        <span className="description short">{shortDescription}</span>
      </div>
    </motion.li>
  );
}

