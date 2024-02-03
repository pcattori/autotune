import { route$, loader$, action$, type Params, Link } from "../autotune";
import { db } from "~/db";

type Stripe = "Stripe";

const loader = loader$(async () => {
  let data = await db.read();
  return { data };
});

const action = action$(async ({ request }) => {
  await db.write(request.url);
  return null;
});

type MyProps = {
  params: Params<"slug" | "lang">;
  context: { stripe: Stripe };
};

// type Props = Record<string, unknown> | undefined;
// let myprops: MyProps = {} as any;
// let props: Props = {} as any;
// props = myprops;
// myprops = props;

const route = ({ params }: MyProps) =>
  route$({
    loader,
    action,
    component: ({ data }) => {
      return (
        <>
          <h1>Welcome to Autotune</h1>
          <h2>You're on the {params.slug} page</h2>
          <pre>{data}</pre>
          <Link to="about">About</Link>
        </>
      );
    },
  });

export default route;
