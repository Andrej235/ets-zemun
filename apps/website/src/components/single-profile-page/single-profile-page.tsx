import ProfileSchema from "@assets/json-data/ts-schemas/profile.schema";
import { Link, useLoaderData } from "react-router";

export default function SingleProfilePage() {
  const loaderData = useLoaderData<ProfileSchema>();

  return (
    <div>
      <h1>{loaderData.name}</h1>
      <p>{loaderData.description}</p>
      <img src={loaderData.imagePath} alt={loaderData.name} />
      <table>
        <tbody>
          <tr>
            <td>
              <h1>Opste obrazovni predmeti</h1>
            </td>
          </tr>

          {loaderData.classes.general.map((x) => (
            <tr key={x.className}>
              <td>
                <Link
                  to={`/predmeti/${x.className
                    .toLocaleLowerCase()
                    .replace(/-/g, "-")}`}
                >
                  {x.className}
                </Link>
              </td>

              {x.perWeek.map((count, i) => (
                <td key={`${x.className}-${i}`}>{count}</td>
              ))}
            </tr>
          ))}

          <tr>
            <td>
              <h1>Strucni predmeti</h1>
            </td>
          </tr>

          {loaderData.classes.specific.map((x) => (
            <tr key={x.className}>
              <td>
                <Link
                  to={`/predmeti/${x.className
                    .toLocaleLowerCase()
                    .replace(/-/g, "-")}`}
                >
                  {x.className}
                </Link>
              </td>

              {x.perWeek.map((count, i) => (
                <td key={`${x.className}-${i}`}>{count}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

