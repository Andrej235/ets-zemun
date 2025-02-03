import "./single-profile-page.scss";
import ProfileSchema from "@assets/json-data/ts-schemas/profile.schema";
import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";

export default function SingleProfilePage() {
  const loaderData = useLoaderData<ProfileSchema>();

  const classes = useMemo(() => {
    return [
      ...loaderData.classes.specific,
      ...loaderData.classes.general,
    ].reduce(
      (
        acc: {
          className: string;
          count: number;
          type: "general" | "specific";
        }[][],
        x
      ) => {
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
      },
      []
    );
  }, [loaderData]);

  const [selectedYear, setSelectedYear] = useState(1);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="single-profile-page">
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
          {classes[selectedYear - 1]?.map((classItem) => (
            <div
              key={classItem.className}
              className={"class-item " + classItem.type}
            >
              <p className="class-name">{classItem.className}</p>
              <p className="class-count">{classItem.count} x nedeljno</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

