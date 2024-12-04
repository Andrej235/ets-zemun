import { useState } from "react";
import NewsPreview from "../NewsPreview/NewsPreview";
import "./NewsAndEventsPreviewContainer.scss";
import { motion } from "motion/react";

export default function NewsAndEventsPreviewContainer() {
  const [selectedTab, setSelectedTab] = useState<"news" | "events">("news");

  return (
    <div className="news-container">
      <h1 className="news-section-title">Novosti i dogadjanja</h1>
      <div className="options-container">
        <button
          className="option-button"
          onClick={() => setSelectedTab("news")}
        >
          <p>Novosti</p>

          {selectedTab === "news" && (
            <motion.div
              className="underline"
              layoutId="underline"
              layoutDependency={selectedTab}
            />
          )}
        </button>

        <button
          className="option-button"
          onClick={() => setSelectedTab("events")}
        >
          <p>Dogadjanja</p>

          {selectedTab === "events" && (
            <motion.div
              className="underline"
              layoutId="underline"
              layoutDependency={selectedTab}
            />
          )}
        </button>
      </div>

      {selectedTab === "news" ? (
        <>
          <NewsPreview
            date={new Date()}
            title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, sapiente?"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quasi cumque enim dolores molestiae dolorum dolore accusamus! In, praesentium quibusdam."
            image="/mock-news-preview/1.png"
          />

          <NewsPreview
            date={new Date("2024-05-15")}
            title="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elitadipisicing elit. Minus amet ea saepe corporis, quam labore officia obcaecati necessitatibus itaque quo optio? Adipisci asperiores pariatur rerum perspiciatis tempore odit rem, fugit dolorem quam doloremque voluptatum officiis magnam error dignissimos vitae excepturi temporibus maiores reiciendis veniam ipsam! Tempora nobis aliquid eligendi qui."
            image="/mock-news-preview/2.png"
          />

          <NewsPreview
            date={new Date("2024-01-23")}
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatibus beatae minima!"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci asperiores pariatur rerum perspiciatis tempore odit rem, fugit dolorem quam doloremque voluptatum officiis magnam error dignissimos vitae excepturi temporibus maiores reiciendis veniam ipsam! Tempora nobis aliquid eligendi qui."
            image="/mock-news-preview/3.png"
          />
        </>
      ) : (
        <>Events</>
      )}
    </div>
  );
}
