import DocumentGroup from "./document-group";
import "./documents.scss";

export default function Documents() {
  const sampleGroup = {
    title: "Technical Documentation",
    accentColor: "#2196F3",
    iconName: "file",
    documents: [
      { title: "User Guide", url: "/docs/user-guide.pdf" },
      { title: "API Reference", url: "/docs/api-reference.pdf" },
      { title: "Troubleshooting", url: "/docs/troubleshooting.pdf" },
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
