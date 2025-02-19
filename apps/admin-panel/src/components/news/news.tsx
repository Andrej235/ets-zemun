import { useQuill } from "react-quilljs";
//@ts-expect-error CSS
import "quill/dist/quill.snow.css";
import "./news.scss";

export default function News() {
  const { quillRef } = useQuill();

  return (
    <div className="news">
      <div ref={quillRef} />
    </div>
  );
}

