import type { NextPage } from "next";
import { useSession } from "next-auth/react";

export const Home: NextPage = () => {
  const { data: session } = useSession();

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
