import useLoader from "@/better-router/use-loader";
import educationalProfilesLoader from "./edu-profiles-loader";
import Async from "@/better-router/async";

export default function EducationalProfiles() {
  const loaderData = useLoader<typeof educationalProfilesLoader>();

  return (
    <div className="flex flex-col gap-4">
      <Async await={loaderData}>
        {(data) => {
          if (data.code !== "OK") return;
          const profiles = data.content;

          return profiles.map((profile) => (
            <div key={profile.id}>
              <h1>{profile.id}</h1>
              <p>{profile.name}</p>
            </div>
          ));
        }}
      </Async>
    </div>
  );
}

