import "./expander.scss";
import Icon from "@/components/icon/icon";
import { useState } from "react";

type ExpanderProps = {
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly initiallyOpen?: boolean;
};

export default function Expander({
  title = "Default Title",
  children,
  initiallyOpen = false,
}: ExpanderProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  function toggleExpander() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="expander">
      <button onClick={toggleExpander}>
        <Icon name={isOpen ? "caret-up" : "caret-down"} />
        {title}
      </button>

      {isOpen && <div className="expander-content">{children}</div>}
    </div>
  );
}
