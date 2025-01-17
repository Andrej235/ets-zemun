import "./news-preview.scss";

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
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="info">
        <h1 className="title">{title}</h1><br />
        <p className="description">{description}</p>
        <p className="date">{date.toLocaleDateString()}</p>
      </div>
    </div>
  );
}

