import Icon from "@/components/icon/icon";
import { getTranslations } from "next-intl/server";
import "./documents.scss";

type Document = {
  title: string;
  url: string;
};

export type DocumentGroupType = {
  title: string;
  iconName: string;
  accentColor: string;
  documents: Document[];
};

const data: {
  documentGroups: DocumentGroupType[];
} = {
  documentGroups: [
    {
      title: "documents.groups.6.title",
      iconName: "calendar-check",
      accentColor: "#2B7A78",
      documents: [
        {
          title: "documents.groups.6.documents.0",
          url: "/documents/godisnji-plan.docx",
        },
        {
          title: "documents.groups.6.documents.1",
          url: "/documents/aneks-1-2024-25.pdf",
        },
        {
          title: "documents.groups.6.documents.2",
          url: "/documents/aneks-2-2024-25.pdf",
        },
        {
          title: "documents.groups.6.documents.3",
          url: "/documents/izvestaj-o-realizaciji-GPR-za-2024-25.docx",
        },
        {
          title: "documents.groups.6.documents.4",
          url: "/documents/izvestaj-o-radu-direktora-2024-2025.docx",
        },
      ],
    },
    {
      title: "documents.groups.7.title",
      iconName: "book-open",
      accentColor: "#A49271",
      documents: [
        {
          title: "documents.groups.7.documents.0",
          url: "/documents/planovi-nastave/elektrotehničar-informacionih-tehnologija.pdf",
        },
        {
          title: "documents.groups.7.documents.1",
          url: "/documents/planovi-nastave/administrator-računarskih-mreža.pdf",
        },
        {
          title: "documents.groups.7.documents.2",
          url: "/documents/planovi-nastave/elektrotehničar-računara.pdf",
        },
        {
          title: "documents.groups.7.documents.3",
          url: "/documents/planovi-nastave/elektrotehničar-automatike.pdf",
        },
        {
          title: "documents.groups.7.documents.4",
          url: "/documents/planovi-nastave/elektromehaničar-za-rashladne-i-termičke-uređaje.pdf",
        },
      ],
    },
    {
      title: "documents.groups.0.title",
      iconName: "users",
      accentColor: "#2A5DB0",
      documents: [
        {
          title: "documents.groups.0.documents.0",
          url: "/documents/poslovnik-o-radu-nastavnickog-veca.docx",
        },
        {
          title: "documents.groups.0.documents.1",
          url: "/documents/poslovnik-o-radu-skolskog-odbora.docx",
        },
        {
          title: "documents.groups.0.documents.2",
          url: "/documents/poslovnik-o-radu-ucenickog-parlamenta.docx",
        },
        {
          title: "documents.groups.0.documents.3",
          url: "/documents/poslovnik-o-radu-saveta-roditelja.docx",
        },
      ],
    },
    {
      title: "documents.groups.1.title",
      iconName: "balance-scale",
      accentColor: "#2E7D32",
      documents: [
        {
          title: "documents.groups.1.documents.0",
          url: "/documents/eticki-kodeks.docx",
        },
        {
          title: "documents.groups.1.documents.1",
          url: "/documents/pravila-ponasanja.docx",
        },
      ],
    },
    {
      title: "documents.groups.2.title",
      iconName: "shield-alt",
      accentColor: "#C62828",
      documents: [
        {
          title: "documents.groups.2.documents.0",
          url: "/documents/pravilnik-o-bezbednosti-i-zdravlja-na-radu.docx",
        },
        {
          title: "documents.groups.2.documents.1",
          url: "/documents/pravilnik-o-merama-zastite-ucenika.docx",
        },
      ],
    },
    {
      title: "documents.groups.3.title",
      iconName: "file-invoice-dollar",
      accentColor: "#6A1B9A",
      documents: [
        {
          title: "documents.groups.3.documents.0",
          url: "/documents/pravilnik-o-bankama.docx",
        },
        {
          title: "documents.groups.3.documents.1",
          url: "/documents/pravilnik-o-organizaciji-budzeta.docx",
        },
        {
          title: "documents.groups.3.documents.2",
          url: "/documents/pravilnik-o-organizaciji-radnih-mesta.docx",
        },
      ],
    },
    {
      title: "documents.groups.4.title",
      iconName: "briefcase",
      accentColor: "#EF6C00",
      documents: [
        {
          title: "documents.groups.4.documents.0",
          url: "/documents/pravilnik-o-pravima-i-obavezama-zaposlenih.docx",
        },
        {
          title: "documents.groups.4.documents.1",
          url: "/documents/pravilnik-o-radu.docx",
        },
      ],
    },
    {
      title: "documents.groups.5.title",
      iconName: "landmark",
      accentColor: "#9E9D24",
      documents: [
        {
          title: "documents.groups.5.documents.0",
          url: "/documents/statut.doc",
        },
      ],
    },
  ],
};

export default async function Documents({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale });

  return (
    <div className="documents-container" data-search-key="dokumenta">
      <div className="document-group-wrapper">
        {data.documentGroups.map(
          ({ accentColor, documents, iconName, title }) => (
            <div className="document-group-container" key={title}>
              <div
                className="group-header"
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <h2 className="group-title">{t(title)}</h2>
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
                    <p>{t(document.title)}</p>
                    <Icon name="download" className="download" />
                  </a>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
