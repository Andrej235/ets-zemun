import Icon from "@components/icon/icon";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
        <h2>
          Tokom četvorogodišnjeg školovanja, učenici se upoznavaju sa širokim
          spektrom znanja i veština iz oblasti programiranja, mrežnih
          tehnologija, baza podataka i računarskog hardvera. Ova znanja
          uključuju:
        </h2>

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
          <motion.li
            layout
            style={{
              position: selectedClassIdx === 0 ? "absolute" : "relative",
            }}
            animate={{
              zIndex: selectedClassIdx === 0 ? 10 : 0,
              transition: {
                delay: selectedClassIdx === 0 ? 0 : 0.5,
                duration: 0.5,
              },
            }}
            className={selectedClassIdx === 0 ? "selected" : undefined}
          >
            <button onClick={() => handleSelectClass(0)} key={"it-class-0"}>
              <Icon name="square-binary" />
              <span className="title">Programiranje</span>
            </button>

            <div className="description-container">
              <span className="description">
                U prve dve godine skolovanja programiranje obuhvata uvod u
                algoritme i sablone programiranja, kao i osnove jezika C. Nakon
                naucenih osnova, djacima se predstavlja jezik C# kojim razvijaju
                konzolne i desktop aplikacije ostatak skolovanja u .NET
                okruzenju
              </span>
            </div>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 1 ? "absolute" : "relative",
            }}
            className={selectedClassIdx === 1 ? "selected" : undefined}
            animate={{
              zIndex: selectedClassIdx === 1 ? 10 : 0,
              transition: {
                delay: selectedClassIdx === 1 ? 0 : 0.5,
                duration: 0.5,
              },
            }}
          >
            <button onClick={() => handleSelectClass(1)} key={"it-class-$1"}>
              <Icon name="code" />
              <span className="title">Web programiranje</span>
            </button>

            <div className="description-container">
              <span className="description">
                Web dizajn i web programiranje zajedno obuhvataju razne
                tehnologije i alate potrebne za kreiranje web stranica. Ovde
                djaci uce da koriste HTML, CSS i JavaScript ukljucujuci i
                biblioteku jquery
              </span>
            </div>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 2 ? "absolute" : "relative",
            }}
            className={selectedClassIdx === 2 ? "selected" : undefined}
            animate={{
              zIndex: selectedClassIdx === 2 ? 10 : 0,
              transition: {
                delay: selectedClassIdx === 2 ? 0 : 0.5,
                duration: 0.5,
              },
            }}
          >
            <button onClick={() => handleSelectClass(2)} key={"it-class-2"}>
              <Icon name="database" />
              <span className="title">Baze podataka</span>
            </button>

            <div className="description-container">
              <span className="description">
                Baze podataka pruzaju ucenicima mogucnost dizajniranja,
                kreiranja i upravljanja realisticnim bazama podataka koristeci
                SQL. Ovaj predmet takodje obuhvata najbolje prakse koje treba da
                se prate prilikom rada sa bazama podataka radi najboljih
                rezultata
              </span>
            </div>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 3 ? "absolute" : "relative",
            }}
            className={selectedClassIdx === 3 ? "selected" : undefined}
            animate={{
              zIndex: selectedClassIdx === 3 ? 10 : 0,
              transition: {
                delay: selectedClassIdx === 3 ? 0 : 0.5,
                duration: 0.5,
              },
            }}
          >
            <button onClick={() => handleSelectClass(3)} key={"it-class-3"}>
              <Icon name="shield-halved" />
              <span className="title">ZIS</span>
            </button>

            <div className="description-container">
              <span className="description">
                Zastita informacionih tehnologija pokazuje kako zastiti sebe,
                ali i svoje projekte od napada i neovlašćenog pristupa. Pored
                teorije, djaci imaju priliku da se upoznaju za alatima kao sto
                je CryptTool i Linux operativnim sistemom
              </span>
            </div>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 4 ? "absolute" : "relative",
            }}
            className={selectedClassIdx === 4 ? "selected" : undefined}
            animate={{
              zIndex: selectedClassIdx === 4 ? 10 : 0,
              transition: {
                delay: selectedClassIdx === 4 ? 0 : 0.5,
                duration: 0.5,
              },
            }}
          >
            <button onClick={() => handleSelectClass(4)} key={"it-class-4"}>
              <Icon name="cubes-stacked" />
              <span className="title">PIT</span>
            </button>

            <div className="description-container">
              <span className="description">
                Primenjene informacione tehnologije kombinuju svo znanje steceno
                u ostalim strucnim predmetima i da ga iskoriste za kreiranje
                full stack desktop i web aplikacija kroz izradu zajednickih
                projekata koristeci C# ASP.NET Web Forme, C# WPF i SQL
              </span>
            </div>
          </motion.li>
        </ul>

        <p>
          Elektrotehničar informacionih tehnologija je idealan izbor za sve koji
          žele da budu deo dinamičnog i perspektivnog sveta informacionih
          tehnologija.
        </p>

        {/* TODO: Add a 'learn more' button */}
      </div>
    </div>
  );
}

