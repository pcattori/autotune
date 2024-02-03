import { ReactNode } from "react";

type Loader = (args: { request: Request }) => unknown;
export const loader$ = <T extends Loader>(loader: T): T => loader;

type Action = (args: { request: Request }) => unknown;
export const action$ = <T extends Action>(action: T): T => action;

type Component<L extends Loader> = (data: Awaited<ReturnType<L>>) => ReactNode;

type Props = {
  params: Record<string, string>;
  context: Record<string, unknown>;
};

type Route<L extends Loader, A extends Action, C extends Component<L>> = {
  loader?: L;
  action?: A;
  component?: C;
};

export const route$ = <
  P extends Props,
  L extends Loader,
  A extends Action,
  C extends Component<L>,
>(
  createRoute: (props: P) => Route<L, A, C>,
) => createRoute;

export type Params<Key extends string> = Record<Key, string>;

export const Link = (props: { to: string; children: ReactNode }) => (
  <a href={props.to} />
);
