import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await pdfParse(buffer);

    return new Response(
      JSON.stringify({
        exams: extractExams(result.text),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

type Exam = {
  subject: string;
  commission: string;
  date: string;
  startTime: string;
  cabinet: string;
};

function extractExams(data: string): Exam[] {
  const pages = data
    .split("\n\n")
    .map((x) =>
      x.substring((Math.max(0, x.indexOf("КАБИНЕТ")) || -7) + 7).trim(),
    )
    .map((x) =>
      x.substring((Math.max(0, x.indexOf("ГОДИНЕ")) || -6) + 6).trim(),
    )
    .filter((x) => x);

  const exams = pages.join(" ").split("\n").join(" ") + " ";

  function extractDates(input: string) {
    const regex =
      /^(.*?)(((1|2|3)\..+?){1,3})([\d{1,2}\.\d{1,2}\.\d{4}\. ]+?)(\d{1,2}:\d{2})((?:[\d ]+?)?|(?:[^ ]+?)?) /;

    const exams: Exam[] = [];

    while (input.length > 0) {
      input = input.replace(regex, (x, ...y) => {
        const exam = {
          subject: y[0].replace("  ", " ").trim(),
          commission: y[1].replace("  ", " ").trim(),
          date: y[4].replace("  ", " ").trim(),
          startTime: y[5].replace("  ", " ").trim(),
          cabinet: y[6]?.replace("  ", " ")?.trim() ?? "",
        };
        exams.push(exam);
        return "";
      });
    }

    return exams;
  }

  return extractDates(exams);
}
