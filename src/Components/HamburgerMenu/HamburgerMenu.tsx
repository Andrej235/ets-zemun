import './HamburgerMenu.scss';
import { DOMAttributes, HTMLAttributes, useRef } from 'react';

interface HamburgerMenuProps
  extends DOMAttributes<HTMLElement>,
    HTMLAttributes<HTMLElement> {}

function HamburgerMenu({ ...attributes }: HamburgerMenuProps) {
  const hamburgerMenuRef = useRef<HTMLDivElement>(null);

  const ClickHandler = () => {
    hamburgerMenuRef.current?.classList.toggle("active");
  };

  return (
    <div className="hamburger-menu-wrapper" {...attributes}>
      <div
        className="hamburger-menu"
        ref={hamburgerMenuRef}
        onClick={ClickHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default HamburgerMenu;