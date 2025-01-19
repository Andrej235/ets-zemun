import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export type HTMLProps<T extends HTMLElement> = DetailedHTMLProps<
  HtmlHTMLAttributes<T>,
  T
> & {
  [key: `data-${string}`]: string;
};
