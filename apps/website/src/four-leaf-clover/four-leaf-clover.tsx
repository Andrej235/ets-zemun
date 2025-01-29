import "./four-leaf-clover.scss";

export default function FourLeafClover() {
  return (
    <div className="four-leaf-clover">
      <FourLeafCloverLeaf count={100} title="Zaposlenih nastavnika" />
      <FourLeafCloverLeaf count={750} title="Upisanih ucenika" />
      <FourLeafCloverLeaf count={40} title="Opremljenih kabineta" />
      <FourLeafCloverLeaf count={15} title="Osvojenih nagrada" />
    </div>
  );
}

type LeafProps = {
  readonly count: number;
  readonly title: string;
};

function FourLeafCloverLeaf({ title, count }: LeafProps) {
  return (
    <div className="four-leaf-clover-leaf">
      <div className="count">{count}+</div>
      <div className="title">{title}</div>
    </div>
  );
}

