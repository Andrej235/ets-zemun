import { useQuill } from "react-quilljs";
//@ts-expect-error CSS
import "quill/dist/quill.snow.css";
import "./news.scss";
import { useEffect } from "react";

export default function News() {
  const { quillRef, quill } = useQuill();

  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft && quill) quill.root.innerHTML = draft;

    quill?.on("text-change", () => {
      localStorage.setItem("draft", quill?.root.innerHTML);
    });
  }, [quill]);

  return (
    <div className="news">
      <div ref={quillRef} />

      <button
        onClick={() => {
          console.log(quill?.root.innerHTML);
        }}
      >
        Save
      </button>
    </div>
  );
}

