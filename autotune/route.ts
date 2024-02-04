import { ReactNode } from "react";

type Loader = (args: { request: Request }) => unknown;
export const loader$ = <T extends Loader>(loader: T): T => loader;

type Action = (args: { request: Request }) => unknown;
export const action$ = <T extends Action>(action: T): T => action;

type Component<P extends string, L extends Loader> = (args: {
  params: string[] extends P
    ? Record<never, string>
    : Record<P[number], string>;
  data: Awaited<ReturnType<L>>;
}) => ReactNode;

export type Route<
  P extends string = string,
  L extends Loader = Loader,
  A extends Action = Action,
  C extends Component<P, L> = Component<P, L>,
> = {
  params?: P[];
  loader?: L;
  action?: A;
  component?: C;
};

export const route$ = <
  const P extends string,
  L extends Loader,
  A extends Action,
  C extends Component<P, L>,
>(
  route: Route<P, L, A, C>,
) => route;
