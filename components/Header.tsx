import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Navbar, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const Header: FC = () => {
  const { data: session } = useSession();

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Link href={"/"}>Cyclist Pro Data</Link>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        {session?.user && (
          <Navbar.Link href={"/profile"}>My Profile</Navbar.Link>
        )}
        {/*<Navbar.Link isActive>Customers</Navbar.Link>*/}
        {/*<Navbar.Link>Pricing</Navbar.Link>*/}
        {/*<Navbar.Link>Company</Navbar.Link>*/}
      </Navbar.Content>
      <Navbar.Content>
        {session && (
          <Grid.Container alignItems="center" gap={2}>
            <Grid>
              <Avatar size="lg" src={session.user.image} />
            </Grid>
            <Grid>
              <Navbar.Link color="primary" onClick={() => signOut()}>
                Log out
              </Navbar.Link>
            </Grid>
          </Grid.Container>
        )}
        {!session && (
          <Button color="primary" auto flat onClick={() => signIn()}>
            Log in
          </Button>
        )}
      </Navbar.Content>
    </Navbar>
  );
};
