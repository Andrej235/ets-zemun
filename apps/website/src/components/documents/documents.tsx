import DocumentGroup from "./document-group";
import "./documents.scss";

export default function Documents() {
  const sampleGroup = {
    title: "Tehnička dokumentacija",
    accentColor: "#2196F3",
    iconName: "file",
    documents: [
      { title: "Korisnički priručnik", url: "/docs/user-guide.pdf" },
      { title: "API Referenca", url: "/docs/api-reference.pdf" },
      { title: "Rešavanje problema", url: "/docs/troubleshooting.pdf" },
    ],
  };

  return (
    <div className="documents-container">
      <div className="document-group-wrapper">
        <DocumentGroup group={sampleGroup} />
        <DocumentGroup group={sampleGroup} />
        <DocumentGroup group={sampleGroup} />
        <DocumentGroup group={sampleGroup} />
      </div>
    </div>
  );
}

