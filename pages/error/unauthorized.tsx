import { Button, Grid, Text } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { USER_STATUS } from "../../utils";

const Unauthorized = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === USER_STATUS.ALLOW) {
    router.push("/");
  }

  return (
    <>
      <Text h1>Oops, looks like you are not logged in...</Text>
      <Grid.Container justify="center" alignItems="center" direction="row">
        <Text h2>Please log in to continue:</Text>
        <Button color="primary" auto flat onClick={() => signIn()}>
          Log in
        </Button>
      </Grid.Container>
    </>
  );
};

export default Unauthorized;
