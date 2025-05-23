import { DetailedHTMLProps, forwardRef, HtmlHTMLAttributes } from "react";

type HTMLProps<T extends HTMLElement> = DetailedHTMLProps<
  HtmlHTMLAttributes<T>,
  T
> & {
  [key: `data-${string}`]: string;
};

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

Icon.displayName = "Icon";
export default Icon;
