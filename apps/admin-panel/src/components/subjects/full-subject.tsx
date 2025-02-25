import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import fullSubjectLoader from "./full-subject-loader";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function FullSubject() {
  const loaderData = useLoader<typeof fullSubjectLoader>();

  return (
    <div>
      <div>
        <h1>Prevodi</h1>

        <div>
          <h2>Српски (ћирилица)</h2>

          <Async await={loaderData.translations.sr}>
            {(data) => {
              if (data.code !== "OK") return null;

              return (
                <div className="flex gap-4">
                  <Input defaultValue={data.content.name} />

                  <Textarea defaultValue={data.content.description} />
                </div>
              );
            }}
          </Async>
        </div>

        <div>
          <h2>Srpski (latinica)</h2>

          <Async await={loaderData.translations.sr_lt}>
            {(data) => {
              if (data.code !== "OK") return null;

              return (
                <div className="flex gap-4">
                  <Input defaultValue={data.content.name} />

                  <Textarea defaultValue={data.content.description} />
                </div>
              );
            }}
          </Async>
        </div>

        <div>
          <h2>English</h2>

          <Async await={loaderData.translations.en}>
            {(data) => {
              if (data.code !== "OK") return null;

              return (
                <div className="flex gap-4">
                  <Input defaultValue={data.content.name} />

                  <Textarea defaultValue={data.content.description} />
                </div>
              );
            }}
          </Async>
        </div>
      </div>
    </div>
  );
}

