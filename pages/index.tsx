import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const Home: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <>
      <main>
        {!session && <> Please login to use the platform </>}
        {session && (
          <>
            Welcome back <strong>{session.user?.name} </strong>
          </>
        )}
      </main>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Home;
