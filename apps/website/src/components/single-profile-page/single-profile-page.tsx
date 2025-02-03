import "./single-profile-page.scss";
import ProfileSchema from "@assets/json-data/ts-schemas/profile.schema";
import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";

export default function SingleProfilePage() {
  const loaderData = useLoaderData<ProfileSchema>();

  const classes = useMemo(() => {
    return [
      ...loaderData.classes.general,
      ...loaderData.classes.specific,
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
          <button onClick={() => handleYearChange(1)}>Year 1</button>
          <button onClick={() => handleYearChange(2)}>Year 2</button>
          <button onClick={() => handleYearChange(3)}>Year 3</button>
          <button onClick={() => handleYearChange(4)}>Year 4</button>
        </div>

        <div className="classes-list">
          {classes[selectedYear - 1]?.map((classItem) => (
            <div key={classItem.className} className="class-item">
              <p>{classItem.className}</p>
              <p>{classItem.count}</p>
              <p>{classItem.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

