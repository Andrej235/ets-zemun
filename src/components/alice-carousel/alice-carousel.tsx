import "./alice-carousel.scss";

type AliceCarouselProps = {
    children: React.ReactNode;
}

export default function AliceCarousel({ children }: AliceCarouselProps) {
  return (
    <div className="alice-carousel-container">{children}</div>
  )
}
