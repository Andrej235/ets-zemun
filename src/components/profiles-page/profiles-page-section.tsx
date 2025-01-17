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
          >
            <button onClick={() => handleSelectClass(0)} key={"it-class-0"}>
              <Icon name="square-binary" />
              <span className="title">Programiranje</span>
            </button>

            <span className="description">
              Programiranje ukljucuje razvoj konzolnih i desktop aplikacija
              koristeci jezike <a href="#c">C</a> i <a href="#c#">C#</a>
            </span>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 1 ? "absolute" : "relative",
            }}
          >
            <button onClick={() => handleSelectClass(1)} key={"it-class-$1"}>
              <Icon name="code" />
              <span className="title">Web programiranje</span>
            </button>

            <span className="description">
              Web dizajn i web programiranje zajedno obuhvataju razne
              tehnologije i alate potrebne za kreiranje web stranica koristeci{" "}
              <a href="#html">HTML</a>, <a href="#css">CSS</a> i{" "}
              <a href="#javascript">JavaScript</a> kao i{" "}
              <a href="#jquery">jquery</a>, a u kasnijem skolovanju i pravljenje
              full stack web aplikacija koristeci <a href="#asp">ASP.NET</a> sa{" "}
              <a href="#c#">C#</a> i <a href="#sql">SQL</a>
            </span>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 2 ? "absolute" : "relative",
            }}
          >
            <button onClick={() => handleSelectClass(2)} key={"it-class-2"}>
              <Icon name="database" />
              <span className="title">Baze podataka</span>
            </button>

            <span className="description">
              Baze podataka pruzaju ucenicima mogucnost dizajniranja, kreiranja
              i upravljanja realisticnim bazama podataka koristeci{" "}
              <a href="#sql">SQL</a>
            </span>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 3 ? "absolute" : "relative",
            }}
          >
            <button onClick={() => handleSelectClass(3)} key={"it-class-3"}>
              <Icon name="shield-halved" />
              <span className="title">ZIS</span>
            </button>

            <span className="description">
              Zastita informacionih tehnologija uce djake kako da zastite sebe i
              svoje buduce projekte od napada i neovlašćenog pristupa
            </span>
          </motion.li>

          <motion.li
            layout
            style={{
              position: selectedClassIdx === 4 ? "absolute" : "relative",
            }}
          >
            <button onClick={() => handleSelectClass(4)} key={"it-class-4"}>
              <Icon name="cubes-stacked" />
              <span className="title">PIT</span>
            </button>

            <span className="description">
              Primenjene informacione tehnologije su namenjene da kombinuju svo
              znanje steceno u ostalim strucnim predmetima i da ga iskoriste za
              kreiranje full stack desktop i web aplikacija kroz izradu
              zajednickih projekata
            </span>
          </motion.li>
        </ul>

        <p>
          Elektrotehničar informacionih tehnologija je idealan izbor za sve koji
          žele da budu deo dinamičnog i perspektivnog sveta informacionih
          tehnologija.
        </p>
      </div>
    </div>
  );
}

