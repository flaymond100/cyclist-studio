import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Grid, Text } from "@nextui-org/react";
import { USER_STATUS } from "../utils";
import router from "next/router";

export const Home: NextPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === USER_STATUS.ALLOW) {
      router.push("/profile");
    }

    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <>
      {!session && (
        <Grid.Container
          css={{ textAlign: "center", marginTop: 100 }}
          justify="center"
          alignItems="center"
        >
          <Grid>
            <Text
              h1
              size={60}
              css={{
                textGradient: "45deg, $purple600 -20%, $pink600 100%",
              }}
              weight="bold"
            >
              Welcome to
            </Text>
            <Text
              h1
              size={70}
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
              weight="bold"
            >
              Cyclist Pro Data
            </Text>
          </Grid>
        </Grid.Container>
      )}
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default Home;
