import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import fullSubjectLoader from "./full-subject-loader";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import LazyLoadedList from "../lazy-loaded-list/lazy-loaded-list";

export default function FullSubject() {
  const loaderData = useLoader<typeof fullSubjectLoader>();

  async function updateTranslation(
    subject: Schema<"SubjectResponseDto">,
    newName: string,
    newDesc: string,
    languageCode: string
  ) {
    if (subject.name === "" && subject.description === "") {
      const response = await sendAPIRequest("/subject/translation", {
        method: "post",
        payload: {
          name: newName,
          description: newDesc,
          subjectId: subject.id,
          languageCode,
        },
      });

      if (response.code !== "Created") alert(response);
      return;
    }

    const response = await sendAPIRequest("/subject/translation", {
      method: "put",
      payload: {
        name: newName,
        description: newDesc,
        subjectId: subject.id,
        languageCode,
      },
    });

    if (response.code !== "No Content") alert(response);
  }

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

                  <Button
                    variant="outline"
                    className="group min-h-20 min-w-20 p-4"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const name = (
                        target.previousElementSibling
                          ?.previousElementSibling as HTMLInputElement
                      ).value;
                      const description = (
                        target.previousElementSibling as HTMLInputElement
                      ).value;

                      updateTranslation(data.content, name, description, "sr");
                    }}
                  >
                    <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                  </Button>
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
                  <Button
                    variant="outline"
                    className="group min-h-20 min-w-20 p-4"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const name = (
                        target.previousElementSibling
                          ?.previousElementSibling as HTMLInputElement
                      ).value;
                      const description = (
                        target.previousElementSibling as HTMLInputElement
                      ).value;

                      updateTranslation(
                        data.content,
                        name,
                        description,
                        "sr_lt"
                      );
                    }}
                  >
                    <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                  </Button>
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
                  <Button
                    variant="outline"
                    className="group min-h-20 min-w-20 p-4"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const name = (
                        target.previousElementSibling
                          ?.previousElementSibling as HTMLInputElement
                      ).value;
                      const description = (
                        target.previousElementSibling as HTMLInputElement
                      ).value;

                      updateTranslation(data.content, name, description, "en");
                    }}
                  >
                    <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                  </Button>
                </div>
              );
            }}
          </Async>
        </div>
      </div>

      <div>
        <h1>Nastavnici</h1>

        <Async await={loaderData.teachers}>
          {(data) => {
            if (data.code !== "OK") return null;

            const teachers = data.content.teachers;

            return (
              <LazyLoadedList response={teachers}>
                {(x) => <div>{x.name}</div>}
              </LazyLoadedList>
            );
          }}
        </Async>
      </div>
    </div>
  );
}

