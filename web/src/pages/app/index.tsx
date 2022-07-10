import { gql, useQuery } from "@apollo/client";
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";

import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/pagePublic";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const { user } = useUser();

  return (
    <div>
      <h1>Hey!</h1>

      <pre>{JSON.stringify(data.products, null, 2)}</pre>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Link href="/api/auth/login">Login</Link>
      <br />
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
}

// export const getServerSideProps = withPageAuthRequired();
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const token = getAccessToken(req, res);
  // console.log(token);
  return getServerPageGetProducts(null, context);
};

export default withApollo(ssrGetProducts.withPage()(Home));
