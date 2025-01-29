import Icon from "@components/icon/icon";
import "./documents.scss";

type Document = {
  readonly title: string;
  readonly url: string;
};

type DocumentGroup = {
  readonly title: string;
  readonly accentColor: string;
  readonly iconName: string;
  readonly documents: Document[];
};

type DocumentGroupProps = {
  readonly group: DocumentGroup;
};

export default function DocumentGroup({ group }: DocumentGroupProps) {
  return (
    <div className="document-group-container">
      <div 
        className="group-header"
      >
        <h2 className="group-title">{group.title}</h2>
        <Icon name="file" className="icon" />
      </div>
      <div className="documents-list">
        {group.documents.map((document) => (
          <button
            key={document.url}
            className="document-link"
            rel="noopener noreferrer"
          >
            <p>{document.title}</p>
            <Icon name="download" className="download"/>
          </button>
        ))}
      </div>
    </div>
  );
}