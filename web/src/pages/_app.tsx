import { UserProvider } from "@auth0/nextjs-auth0";

import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
