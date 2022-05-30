import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "../../node_modules/next/link";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <h1>Hey!</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Link href="/api/auth/login">Login</Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getAccessToken(req, res);

  console.log(token);

  return {
    props: {},
  };
};
