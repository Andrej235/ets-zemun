import { forwardRef } from "react";
import { HTMLProps } from "../../types/utility/html-props";

type IconProps = {
  readonly className?: string;
  readonly id?: string;
  readonly name: string;
} & HTMLProps<HTMLElement>;

const Icon = forwardRef<HTMLElement, IconProps>(
  ({ name, className, ...attributes }, ref) => {
    return (
      <i
        className={`icon fa fa-${name}${className ? " " + className : ""}`}
        ref={ref}
        {...attributes}
      />
    );
  }
);

export default Icon;

