import { ReactNode } from "react";

type Loader = (args: { request: Request }) => unknown;
export const loader$ = <T extends Loader>(loader: T): T => loader;

type Action = (args: { request: Request }) => unknown;
export const action$ = <T extends Action>(action: T): T => action;

type Component<L extends Loader> = (
  data: L extends Loader ? Awaited<ReturnType<L>> : undefined,
) => ReactNode;

type Route<L extends Loader, A extends Action, C extends Component<L>> = {
  loader?: L;
  action?: A;
  component?: C;
};
export const route$ = <
  L extends Loader,
  A extends Action,
  C extends Component<L>,
>(
  route: Route<L, A, C>,
) => route;

export type Params<Key extends string> = Record<Key, string>;

export const Link = (props: { to: string; children: ReactNode }) => (
  <a href={props.to} />
);
