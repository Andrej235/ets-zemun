import data from "@/assets/json-data/data/documents.json";
import DocumentGroup from "./document-group";
import "./documents.scss";

export default function Documents() {
  return (
    <div
      className="documents-container"
      data-search-key="dokumenta"
    >
      <div className="document-group-wrapper">
        {data.documentGroups.map((group) => {
          return <DocumentGroup key={group.title} group={group} />;
        })}
      </div>
    </div>
  );
}
