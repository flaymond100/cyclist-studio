import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Navbar, Grid } from "@nextui-org/react";

export const Header: FC = () => {
  const { data: session } = useSession();

  console.log(session?.accessToken);

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <p>Cyclist App</p>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        {/*<Navbar.Link>Features</Navbar.Link>*/}
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
                Sign out
              </Navbar.Link>
            </Grid>
          </Grid.Container>
        )}
        {!session && (
          <Button color="primary" auto flat onClick={() => signIn()}>
            Sign in
          </Button>
        )}
      </Navbar.Content>
    </Navbar>
  );
};
