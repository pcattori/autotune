import { route$, loader$, action$, Link } from "autotune";
import { db } from "~/db";

export const routeA = route$({
  loader: ({ request }) => ({ world: request.url }),
  component: ({ data }) => <h1>Hello, {data.world}</h1>,
});

const loader = loader$(async () => {
  let data = await db.read();
  return data;
});

const action = action$(async ({ request }) => {
  await db.write(request.url);
  return null;
});

export const routeB = route$({
  params: ["slug"],
  loader,
  action,
  // displayName?: string - sets the React display name
  component: ({ params, data }) => {
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

export default routeB;
