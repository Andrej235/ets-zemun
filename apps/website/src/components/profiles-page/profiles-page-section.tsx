import Icon from "@components/icon/icon";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export default function ProfilesPageSection() {
  const [selectedClassIdx, setSelectedClassIdx] = useState<number | null>(null);
  const classesContainerRef = useRef<HTMLUListElement>(null);

  function handleSelectClass(idx: number) {
    setSelectedClassIdx((prev) => (prev === idx ? null : idx));
  }

  useEffect(() => {
    if (!classesContainerRef.current || selectedClassIdx === null) return;

    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");

    classesContainerRef.current.children[
      selectedClassIdx
    ].insertAdjacentElement("afterend", placeholder);

    (
      classesContainerRef.current.children[selectedClassIdx] as HTMLElement
    ).style.top = placeholder.offsetTop + "px";

    return () => placeholder.remove();
  }, [classesContainerRef, selectedClassIdx]);

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

        <ul className="classes" ref={classesContainerRef}>
          <ClassItem
            idx={0}
            selectedClassIdx={selectedClassIdx}
            handleSelectClass={handleSelectClass}
            icon="square-binary"
            title="Programiranje"
            longDescription="U prve dve godine skolovanja programiranje obuhvata uvod u algoritme i sablone programiranja, kao i osnove jezika C. Nakon naucenih osnova, djacima se predstavlja jezik C# kojim razvijaju konzolne i desktop aplikacije ostatak skolovanja u .NET okruzenju"
            shortDescription="Razvijanje konzolnih i desktop aplikacija u jeziku C# i .NET okruzenju"
          />

          <ClassItem
            idx={1}
            selectedClassIdx={selectedClassIdx}
            handleSelectClass={handleSelectClass}
            icon="code"
            title="Web programiranje"
            longDescription="Web dizajn i web programiranje zajedno obuhvataju razne tehnologije i alate potrebne za kreiranje web stranica. Ovde djaci uce da koriste HTML, CSS i JavaScript ukljucujuci i biblioteku jquery"
            shortDescription="Kreiranje statičkih i dinamičkih web stranica koristeći HTML, CSS, JavaScript i jQuery"
          />

          <ClassItem
            idx={2}
            selectedClassIdx={selectedClassIdx}
            handleSelectClass={handleSelectClass}
            icon="database"
            title="Baze podataka"
            longDescription="Baze podataka pruzaju ucenicima mogucnost dizajniranja, kreiranja i upravljanja realisticnim bazama podataka koristeci SQL. Ovaj predmet takodje obuhvata najbolje prakse koje treba da se prate prilikom rada sa bazama podataka radi najboljih rezultata"
            shortDescription="Dizajn i implementacija baza podataka koristeći SQL"
          />

          <ClassItem
            idx={3}
            selectedClassIdx={selectedClassIdx}
            handleSelectClass={handleSelectClass}
            icon="shield-halved"
            title="ZIS"
            longDescription="Zastita informacionih tehnologija pokazuje kako zastiti sebe, ali i svoje projekte od napada i neovlašćenog pristupa. Pored teorije, djaci imaju priliku da se upoznaju za alatima kao sto je CryptTool i Linux operativnim sistemom"
            shortDescription="Zastita informacionih tehnologija i upoznavanje sa alatima kao sto su CryptTool i Linux"
          />

          <ClassItem
            idx={4}
            selectedClassIdx={selectedClassIdx}
            handleSelectClass={handleSelectClass}
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

type ClassItemProps = {
  readonly idx: number;
  readonly selectedClassIdx: number | null;
  readonly handleSelectClass: (idx: number) => void;
  readonly icon: string;
  readonly title: string;
  readonly longDescription: string;
  readonly shortDescription: string;
};

function ClassItem({
  idx,
  selectedClassIdx,
  handleSelectClass,
  icon,
  title,
  longDescription,
  shortDescription,
}: ClassItemProps) {
  return (
    <motion.li
      layout
      style={{
        position: selectedClassIdx === idx ? "absolute" : "relative",
        top: selectedClassIdx !== idx ? 0 : undefined,
      }}
      className={selectedClassIdx === idx ? "selected" : undefined}
      animate={{
        zIndex: selectedClassIdx === idx ? 10 : 0,
        transition: {
          delay: selectedClassIdx === idx ? 0 : 0.5,
          duration: 0.5,
        },
      }}
    >
      <button onClick={() => handleSelectClass(idx)} key={`it-class-${idx}`}>
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

