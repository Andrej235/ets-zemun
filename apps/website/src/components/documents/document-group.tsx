import DocumentGroupSchema from "@assets/json-data/ts-schemas/document-group.schema";
import Icon from "@components/icon/icon";

type DocumentGroupProps = {
  readonly group: DocumentGroupSchema;
};

export default function DocumentGroup({
  group: { title, iconName, accentColor, documents },
}: DocumentGroupProps) {
  return (
    <div className="document-group-container">
      <div
        className="group-header"
        style={{
          backgroundColor: accentColor,
        }}
      >
        <h2 className="group-title">{title}</h2>
        <Icon name={iconName} className="icon" />
      </div>
      <div className="documents-list">
        {documents.map((document) => (
          <a
            href={document.url}
            target="_blank"
            key={document.title}
            className="document-link"
          >
            <p>{document.title}</p>
            <Icon name="download" className="download" />
          </a>
        ))}
      </div>
    </div>
  );
}

