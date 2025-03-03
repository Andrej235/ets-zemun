import Async from "@better-router/async";
import useLoader from "@better-router/use-loader";
import useOutsideClick from "@hooks/use-outside-click";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import SingleProfilePageLoader from "./single-profile-page-loader";
import "./single-profile-page.scss";
import SubjectOverlay from "./subject-overlay";

export default function SingleProfilePage() {
  const loaderData = useLoader<typeof SingleProfilePageLoader>();

  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<{
    subject: Schema<"ProfileSubjectResponseDto">;
    type: "general" | "vocational";
  } | null>(null);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const selectedSubjectRef = useRef<HTMLDivElement>(null);
  const isInAnimation = useRef(false);
  useOutsideClick(selectedSubjectRef, () => {
    if (isInAnimation.current) return;

    isInAnimation.current = true;
    setSelectedSubject(null);
  });

  function getYearName(year: number) {
    switch (year) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
    }
  }

  return (
    <div className="single-profile-page">
      <div className={"overlay" + (selectedSubject ? " active" : "")}>
        {selectedSubject && (
          <SubjectOverlay
            key={selectedSubject.subject.subjectId}
            onLayoutAnimationComplete={() => {
              isInAnimation.current = false;
            }}
            subject={selectedSubject.subject}
            type={selectedSubject.type}
            ref={selectedSubjectRef}
          />
        )}
      </div>

      <div className="header">
        <div className="image-container">
          <img
            src="/images/profiles/elektrotehnicar-informacionih-tehnologija.jpg"
            alt="Placeholder"
          />
        </div>

        <div className="info">
          <h1>Elektrotehnicar informacionih tehnologija</h1>

          <p>
            Elektrotehničar informacionih tehnologija je savremeni obrazovni
            profil osmišljen za učenike koji žele da se specijalizuju u oblasti
            informacionih tehnologija, koja predstavlja temelj savremenog
            digitalnog društva i jedan od najperspektivnijih sektora u
            savremenom svetu. Ovaj obrazovni profil omogućava učenicima da
            steknu širok spektar znanja i praktičnih veština neophodnih za rad u
            IT industriji, kao i za nastavak obrazovanja na visokoškolskim
            ustanovama tehničkog usmerenja.
          </p>

          <p>
            Po završetku školovanja, učenici su spremni da nastave svoje
            obrazovanje na fakultetima koji se bave informacionim tehnologijama,
            softverskim inženjeringom, računarstvom i srodnim oblastima. Takođe,
            stiču kompetencije koje im omogućavaju da odmah započnu karijeru u
            IT industriji na pozicijama poput junior programera, mrežnog
            tehničara, administratora baza podataka, tehničke podrške, kao i
            mnogim drugim ulogama u oblasti informacionih tehnologija.
          </p>
        </div>
      </div>

      <div className="body">
        <section>
          <h2>Obrazovni program i stečene veštine</h2>

          <p>
            Tokom četvorogodišnjeg školovanja, učenici se upoznavaju sa širokim
            spektrom znanja i veština iz oblasti programiranja, mrežnih
            tehnologija, baza podataka i računarskog hardvera. Ova znanja
            uključuju:
          </p>

          <ul className="skills">
            <li>
              <h2> Programiranje i razvoj softvera</h2>
              <p>
                Rad sa savremenim programskim jezicima, izrada desktop i web
                aplikacija, objektno orijentisano programiranje
              </p>
            </li>

            <li>
              <h2> Veb tehnologije</h2>
              <p>
                Kreiranje statičkih i dinamičkih veb stranica, korišćenje HTML,
                CSS, JavaScript i naprednih frontend i backend tehnologija
              </p>
            </li>

            <li>
              <h2> Baze podataka</h2>
              <p>
                Dizajn, implementacija i administracija baza podataka, rad sa
                SQL i NoSQL bazama
              </p>
            </li>

            <li>
              <h2> Mrežne tehnologije</h2>
              <p>
                Projektovanje, konfiguracija i održavanje računarskih mreža, rad
                sa mrežnim protokolima i sigurnosnim sistemima
              </p>
            </li>

            <li>
              <h2> Računarski hardver</h2>
              <p>
                Razumevanje principa rada računarskih komponenti i uređaja,
                sastavljanje i održavanje računarskih sistema
              </p>
            </li>
          </ul>

          <p>
            Osim tehničkih znanja, učenici razvijaju ključnesoft skills veštine,
            kao što su analitičko razmišljanje, sposobnost rešavanja problema,
            timski rad i prilagodljivost – osobine koje su izuzetno važne za
            uspeh u dinamičnom svetu informacionih tehnologija.
          </p>
        </section>

        <section>
          <h2>Nastava i praktična primena znanja</h2>

          <p>
            Nastavni proces kombinuje teorijska predavanja i praktičan rad u
            savremeno opremljenim kabinetima i laboratorijama, čime se učenicima
            omogućava da stečeno znanje odmah primenjuju kroz realne projekte i
            zadatke. Praktična nastava i stručna praksa dodatno pripremaju
            učenike za rad u realnom okruženju, kroz saradnju sa IT kompanijama
            i institucijama.
          </p>
        </section>

        <section>
          <h2>Za koga je ovaj obrazovni profil?</h2>

          <p>
            Elektrotehničar informacionih tehnologija je idealan izbor za sve
            one koji žele da se bave modernim tehnologijama, vole rešavanje
            problema i žele da budu deo jednog od najbrže rastućih sektora
            današnjice. Bilo da planiraju nastavak studija ili žele da odmah
            započnu karijeru u IT industriji, ovaj obrazovni profil pruža
            stabilnu osnovu za profesionalni razvoj i uspeh.
          </p>
        </section>
      </div>

      <div className="subjects-container">
        <Async await={loaderData}>
          {(response) => {
            if (response.code !== "200") return null;

            const subjects = response.content;

            const mapped = subjects.generalSubjects
              .filter((x) => x.year === selectedYear)
              .map((x) => ({
                ...x,
                type: "general" as "general" | "vocational",
              }))
              .concat(
                subjects.vocationalSubjects
                  .filter((x) => x.year === selectedYear)
                  .map((x) => ({
                    ...x,
                    type: "vocational",
                  }))
              );

            return (
              <>
                <div className="year-selector">
                  {Array.from(
                    [
                      ...new Set(
                        [
                          ...subjects.generalSubjects,
                          ...subjects.vocationalSubjects,
                        ].map((x) => x.year)
                      ),
                    ].map((year) => (
                      <button
                        key={year}
                        className={selectedYear === year ? "selected" : ""}
                        onClick={() => handleYearChange(year)}
                      >
                        <p>{getYearName(year)}</p>
                      </button>
                    ))
                  )}
                </div>

                <div className="subjects-list">
                  <AnimatePresence mode="popLayout">
                    {mapped.map((x) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                        onLayoutAnimationComplete={() => {
                          isInAnimation.current = false;
                        }}
                        layoutId={x.subject.name}
                        key={x.subject.name}
                        className={"subject-item " + x.type}
                        onClick={() => {
                          if (isInAnimation.current) return;

                          isInAnimation.current = true;
                          setSelectedSubject({
                            subject: x,
                            type: x.type,
                          });
                        }}
                      >
                        <motion.p layout className="subject-name">
                          {x.subject.name}
                        </motion.p>
                        <motion.p layout className="subject-count">
                          {x.perWeek}x nedeljno
                        </motion.p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            );
          }}
        </Async>
      </div>
    </div>
  );
}

