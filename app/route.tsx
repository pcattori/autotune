import { route$, loader$, action$, type Params, Link } from "autotune";
import { db } from "~/db";
import { type Stripe } from "~/stripe";

type Context = {
  params: Params<"slug" | "lang">;
  context: { stripe: Stripe };
};

const loader = loader$(async () => {
  let data = await db.read();
  return { data };
});

const action = action$(async ({ request }) => {
  await db.write(request.url);
  return null;
});

const route = route$(({ params }: Context) => ({
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
}));

export default route;
