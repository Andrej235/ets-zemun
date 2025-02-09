import "./expander.scss";
import Icon from "@components/icon/icon";
import { useState } from "react";

type ExpanderProps = {
  readonly title: string;
  readonly children: React.ReactNode;
};

function Expander({ title, children }: ExpanderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleExpander() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="expander">
      <button onClick={toggleExpander}>
        <Icon name={isOpen ? "caret-up" : "caret-down"} />
        {title}
      </button>

      {isOpen && <div>{children}</div>}
    </div>
  );
}

export default Expander;

