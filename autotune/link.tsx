import { ReactNode } from "react";

export const Link = (props: { to: string; children: ReactNode }) => (
  <a href={props.to} />
);
