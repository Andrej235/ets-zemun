import useOutsideClick from "@hooks/use-outside-click";
import "./single-profile-page.scss";
import ProfileSchema from "@assets/json-data/ts-schemas/profile.schema";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router";

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

            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              aut quia quasi obcaecati quam expedita libero vitae vero! Vel in
              magni rem expedita minima exercitationem doloremque id magnam,
              commodi quos veniam sint maxime earum? Soluta iure veritatis eius
              illo doloremque magnam nesciunt est rerum laborum! Ea dolorem quam
              rem labore quasi sit tempora quis possimus veritatis. Velit
              nostrum consectetur sunt, autem id accusamus reiciendis ipsum
              libero sapiente rerum ad nesciunt odit mollitia quibusdam
              repellendus provident culpa praesentium voluptate voluptas?
              Explicabo blanditiis illum quas, provident dolore molestias quod
              similique sunt ex dolorem sed facere iste quo nobis optio tempora
              vitae! Sint nesciunt aperiam culpa veritatis. Voluptatibus officia
              iusto quis ducimus rem. Similique, beatae facilis? Ipsa voluptatem
              nam iure repellat earum id molestiae, sunt nobis magnam delectus
              dolore voluptatum corrupti voluptas officiis quae facere illum
              esse beatae! Dolor repudiandae, magnam nostrum libero repellat
              nisi, laudantium nulla dolores quod hic dolore aut, assumenda
              quidem quam rerum sed totam nobis ea consequuntur provident vel!
              Optio qui explicabo nihil velit eveniet alias modi, quaerat
              adipisci ex illo. Quaerat dignissimos deserunt sequi et hic
              possimus, velit adipisci eos dolore incidunt facere voluptatibus
              placeat nobis fuga id sint magni minus distinctio consectetur
              doloremque fugiat aliquid aliquam dolor? Dicta ex animi quibusdam
              maiores nulla! Reprehenderit pariatur sunt velit. Rerum natus
              molestiae nisi sequi ab quibusdam quaerat voluptatibus voluptas
              voluptatum quos delectus sed tempora harum distinctio laboriosam
              at optio esse illum, impedit cum eius quod fugit illo eveniet?
              Accusamus sapiente, consectetur eius consequatur eum mollitia qui
              reiciendis voluptatem dolore earum. Deserunt praesentium ea id
              inventore eligendi voluptates veritatis, maxime dolorem nostrum
              repellendus culpa distinctio voluptas omnis velit? Porro deserunt
              sapiente minus tenetur, quaerat blanditiis hic alias impedit
              molestiae eos minima quibusdam aut ratione repellat laudantium
              quam? Culpa expedita incidunt ab tenetur, doloremque cupiditate
              dolore libero autem perspiciatis pariatur sunt corporis placeat
              impedit, assumenda eius facilis omnis officia unde tempora
              voluptatem reprehenderit optio voluptas! Inventore reprehenderit,
              qui vero repellendus illum, asperiores ratione quae excepturi
              praesentium natus quod rem eveniet blanditiis eum culpa in
              cupiditate impedit sapiente alias nobis, iste aperiam adipisci
              corrupti. Illum, blanditiis? Asperiores recusandae aliquam rem
              autem, possimus architecto illum nam. Excepturi quae corporis
              mollitia expedita minima dicta maiores aliquid, impedit alias
              perferendis iusto nulla dolor neque perspiciatis? Numquam odit
              corporis libero dicta omnis quia obcaecati esse eos reprehenderit
              doloribus blanditiis consequatur neque, nesciunt dignissimos
              eligendi et beatae cumque autem porro debitis id impedit
              aspernatur. Distinctio deserunt illo quos quaerat veniam ipsum
              quibusdam consectetur odit dolores esse incidunt possimus ad error
              debitis officiis magnam atque animi perferendis id, quisquam quae
              quia eligendi praesentium! Dolorem atque eveniet magnam vero
              voluptatum inventore repellendus error totam nisi molestiae illum
              enim unde voluptatem commodi deserunt, officiis quo tempora?
              Delectus sapiente fuga accusantium voluptatem culpa eligendi esse
              similique quidem sunt labore provident modi, officia, doloribus
              vel quod earum eius. Deleniti eveniet aliquam, consequatur velit
              quas earum impedit officiis quam provident nisi ab autem similique
              architecto explicabo voluptas at beatae, qui distinctio omnis
              assumenda obcaecati magnam? Nobis neque, suscipit voluptate
              molestiae laudantium odit vero?
            </p>
          </motion.div>
        )}
      </div>

      <h1>{loaderData.name}</h1>
      <p>{loaderData.description}</p>
      <img src={loaderData.imagePath} alt={loaderData.name} />

      <div className="classes-container">
        <div className="year-selector">
          <button
            className={selectedYear === 1 ? "selected" : ""}
            onClick={() => handleYearChange(1)}
          >
            Godina 1
          </button>

          <button
            className={selectedYear === 2 ? "selected" : ""}
            onClick={() => handleYearChange(2)}
          >
            Godina 2
          </button>

          <button
            className={selectedYear === 3 ? "selected" : ""}
            onClick={() => handleYearChange(3)}
          >
            Godina 3
          </button>

          <button
            className={selectedYear === 4 ? "selected" : ""}
            onClick={() => handleYearChange(4)}
          >
            Godina 4
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

