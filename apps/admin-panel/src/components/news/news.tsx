import { useQuill } from "react-quilljs";
//@ts-expect-error CSS
import "quill/dist/quill.snow.css";
import "./news.scss";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

export default function News() {
  const { quillRef, quill } = useQuill();

  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft && quill) quill.root.innerHTML = draft;

    quill?.on("text-change", () => {
      localStorage.setItem("draft", quill?.root.innerHTML);
    });
  }, [quill]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="news">
      <div ref={quillRef} />

      <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
        <PopoverTrigger>Sacuvaj</PopoverTrigger>
        <PopoverContent className="flex flex-col justify-center gap-3 p-12 min-w-max rounded-2xl">
          <h1 className="w-max font-bold text-3xl">
            Da li ste sigurni da zelite da sacuvate promene?
          </h1>
          <h2 className="w-max text-2xl text-muted-foreground">
            Ova akcija je nepovratna
          </h2>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Odustani
            </Button>
            <Button
              onClick={() => {
                console.log(quill?.root.innerHTML);
                localStorage.removeItem("draft");
                setIsModalOpen(false);
              }}
            >
              Sacuvaj
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

