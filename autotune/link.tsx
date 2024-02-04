import { ReactNode } from "react";
import { RoutePaths } from "./index";

export const Link = (props: { to: keyof RoutePaths; children: ReactNode }) => (
  <a href={props.to} />
);
