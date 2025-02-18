import useLoader from "@better-router/use-loader";
import useOutsideClick from "@hooks/use-outside-click";
import { AnimatePresence, motion } from "motion/react";
import { MutableRefObject, useRef, useState } from "react";
import SingleProfilePageLoader from "./single-profile-page-loader";
import "./single-profile-page.scss";
import Async from "@better-router/async";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";

type SubjectItem = {
  name: string;
  count: number;
  type: "general" | "vocational";
};

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

  return (
    <div className="single-profile-page">
      <div className={"overlay" + (selectedSubject ? " active" : "")}>
        {selectedSubject && (
          <motion.div
            layout
            layoutId={selectedSubject.subject.subject.name}
            className={
              "full-screen-subject-container subject-item " +
              selectedSubject.type
            }
            ref={selectedSubjectRef}
            onLayoutAnimationComplete={() => {
              isInAnimation.current = false;
            }}
          >
            <motion.p layout className="subject-name">
              {selectedSubject.subject.subject.name}
            </motion.p>
            <motion.p className="subject-count" layout>
              {selectedSubject.subject.perWeek}x nedeljno
            </motion.p>

            <button onClick={() => console.log("hi")}>Hi</button>
          </motion.div>
        )}
      </div>

      <div className="header">
        <div className="image-container">
          <img src="/placeholder.jpg" alt="Placeholder" />
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
        </div>
      </div>

      <div className="body">
        <section>
          <h2>Mogućnosti nakon školovanja</h2>

          <p>
            Po završetku školovanja, učenici su spremni da nastave svoje
            obrazovanje na fakultetima koji se bave informacionim tehnologijama,
            softverskim inženjeringom, računarstvom i srodnim oblastima. Takođe,
            stiču kompetencije koje im omogućavaju da odmah započnu karijeru u
            IT industriji na pozicijama poput junior programera, mrežnog
            tehničara, administratora baza podataka, tehničke podrške, kao i
            mnogim drugim ulogama u oblasti informacionih tehnologija.
          </p>
        </section>

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
        <div className="year-selector">
          <button
            className={selectedYear === 1 ? "selected" : ""}
            onClick={() => handleYearChange(1)}
          >
            <p>I</p>
          </button>

          <button
            className={selectedYear === 2 ? "selected" : ""}
            onClick={() => handleYearChange(2)}
          >
            <p>II</p>
          </button>

          <button
            className={selectedYear === 3 ? "selected" : ""}
            onClick={() => handleYearChange(3)}
          >
            <p>III</p>
          </button>

          <button
            className={selectedYear === 4 ? "selected" : ""}
            onClick={() => handleYearChange(4)}
          >
            <p>IV</p>
          </button>
        </div>

        <div className="subjects-list">
          <Async await={loaderData}>
            {(response) => {
              if (response.code !== "OK") return null;

              const subjects = response.content;

              return (
                <AnimatePresence mode="popLayout">
                  {subjects.generalSubjects
                    .filter((x) => x.year === selectedYear)
                    .map((x) => (
                      <SubjectItem
                        key={`${x.subjectId},${x.year}`}
                        subjectItem={x}
                        type="general"
                        isInAnimation={isInAnimation}
                        setSelectedSubject={() =>
                          setSelectedSubject({
                            subject: x,
                            type: "general",
                          })
                        }
                      />
                    ))}

                  {subjects.vocationalSubjects
                    .filter((x) => x.year === selectedYear)
                    .map((x) => (
                      <SubjectItem
                        key={`${x.subjectId},${x.year}`}
                        subjectItem={x}
                        type="vocational"
                        isInAnimation={isInAnimation}
                        setSelectedSubject={() =>
                          setSelectedSubject({
                            subject: x,
                            type: "vocational",
                          })
                        }
                      />
                    ))}
                </AnimatePresence>
              );
            }}
          </Async>
        </div>
      </div>
    </div>
  );
}

type SubjectItemProps = {
  readonly subjectItem: Schema<"ProfileSubjectResponseDto">;
  readonly type: "general" | "vocational";
  readonly isInAnimation: MutableRefObject<boolean>;
  readonly setSelectedSubject: () => void;
};

function SubjectItem({
  subjectItem,
  type,
  isInAnimation,
  setSelectedSubject: selectSubject,
}: SubjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
      onLayoutAnimationComplete={() => {
        isInAnimation.current = false;
      }}
      layoutId={subjectItem.subject.name}
      key={subjectItem.subject.name}
      className={"subject-item " + type}
      onClick={() => {
        if (isInAnimation.current) return;

        isInAnimation.current = true;
        selectSubject();
      }}
    >
      <motion.p layout className="subject-name">
        {subjectItem.subject.name}
      </motion.p>
      <motion.p layout className="subject-count">
        {subjectItem.perWeek}x nedeljno
      </motion.p>
    </motion.div>
  );
}

