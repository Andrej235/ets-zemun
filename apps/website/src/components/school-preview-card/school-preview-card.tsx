import PreviewCard, {
  PreviewCardLayout,
} from "@components/preview-card/preview-card";
import "./school-preview-card.scss";

type SchoolPreviewCardProps = {
  readonly layout: PreviewCardLayout;
  readonly image: string;
  readonly description: string;
  readonly title: string;
  readonly count: number;
};

export default function SchoolPreviewCard({
  count,
  description,
  image,
  layout,
  title,
}: SchoolPreviewCardProps) {
  return (
    <PreviewCard imagePath={image} layout={layout} imageAlt={title}>
      <div className={"school-preview-card " + layout}>
        <h1 className="title">
          <span>{count}+</span> {" " + title}
        </h1>

        <p className="description">{description}</p>
      </div>
    </PreviewCard>
  );
}

