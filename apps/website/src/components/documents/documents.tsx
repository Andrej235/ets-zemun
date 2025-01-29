import DocumentGroup from "./document-group";
import "./documents.scss";

export default function Documents() {
  // Example data - replace with your actual data source
  const sampleGroup = {
    title: "Technical Documentation",
    accentColor: "#2196F3",
    iconName: "icon-file-text",
    documents: [
      { title: "User Guide", url: "/docs/user-guide.pdf" },
      { title: "API Reference", url: "/docs/api-reference.pdf" },
      { title: "Troubleshooting", url: "/docs/troubleshooting.pdf" },
    ]
  };

  return (
    <div className="documents-container">
      <DocumentGroup group={sampleGroup} />
    </div>
  );
}