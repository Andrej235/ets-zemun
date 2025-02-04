import ProfileSchema from "@assets/json-data/ts-schemas/profile.schema";
import useOutsideClick from "@hooks/use-outside-click";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import "./single-profile-page.scss";

type ClassItem = {
  className: string;
  count: number;
  type: "general" | "specific";
};

export default function SingleProfilePage() {
  const loaderData = useLoaderData<ProfileSchema>();

  const classes = useMemo(() => {
    return [
      ...loaderData.classes.specific,
      ...loaderData.classes.general,
    ].reduce((acc: ClassItem[][], x) => {
      x.perWeek.forEach((y, index) => {
        if (y !== 0) {
          if (!acc[index]) {
            acc[index] = [];
          }
          acc[index].push({
            className: x.className,
            count: y,
            type: loaderData.classes.general.includes(x)
              ? "general"
              : "specific",
          });
        }
      });
      return acc;
    }, []);
  }, [loaderData]);

  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const selectedClassRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectedClassRef, () => setSelectedClass(null));

  return (
    <div className="single-profile-page">
      <div className={"overlay" + (selectedClass ? " active" : "")}>
        {selectedClass && (
          <motion.div
            layout
            layoutId={selectedClass.className}
            className={
              "full-screen-class-container class-item " + selectedClass.type
            }
            ref={selectedClassRef}
            animate={{
              zIndex: 1000,
            }}
          >
            <motion.p layout className="class-name">
              {selectedClass.className}
            </motion.p>
            <motion.p layout>{selectedClass.count}x nedeljno</motion.p>

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

      <div className="classes-container">
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

        <div className="classes-list">
          <AnimatePresence mode="popLayout">
            {classes[selectedYear - 1]?.map((classItem) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                layout
                layoutId={classItem.className}
                key={classItem.className}
                className={"class-item " + classItem.type}
                onClick={() => {
                  setSelectedClass(classItem);
                }}
              >
                <motion.p layout className="class-name">
                  {classItem.className}
                </motion.p>
                <motion.p layout>{classItem.count}x nedeljno</motion.p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

