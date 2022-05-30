import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
