import { gql, useQuery } from "@apollo/client";
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { withApollo } from "../../lib/withApollo";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      title
    }
  }
`;

function Home() {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  return (
    <div>
      <h1>Hey!</h1>

      <pre>{JSON.stringify({ data }, null, 2)}</pre>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Link href="/api/auth/login">Login</Link>
      <br />
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
}

// export const getServerSideProps = withPageAuthRequired();
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const token = getAccessToken(req, res);
  // console.log(token);

  return {
    props: {
      apolloState,
    },
  };
};

export default withApollo(Home);
