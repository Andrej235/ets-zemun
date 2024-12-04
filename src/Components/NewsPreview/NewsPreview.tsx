import "./NewsPreview.scss";

type NewsPreviewProps = {
  date: Date;
  title: string;
  description: string;
  image: string;
};

export default function NewsPreview({
  date,
  title,
  description,
  image,
}: NewsPreviewProps) {
  return (
    <div className="news-article-preview">
      <div className="info">
        <p className="date">{date.toLocaleDateString()}</p>
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
      </div>

      <div className="image-container">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
