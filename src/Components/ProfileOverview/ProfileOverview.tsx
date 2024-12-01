import "./ProfileOverview.scss";

type ProfileOverviewProps = {
  name: string;
  briefDescription: string;
  image: string;
  layout: "image-left" | "image-right";
};

export default function ProfileOverview({
  briefDescription,
  image,
  name,
  layout,
}: ProfileOverviewProps) {
  return (
    <div className={"profile-overview " + layout}>
      <div className="image-container">
        <img src={image} alt={name} />
      </div>

      <div className="info">
        <h1 className="title">{name}</h1>
        <p className="description">{briefDescription}</p>
      </div>
    </div>
  );
}
