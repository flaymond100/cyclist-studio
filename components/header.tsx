import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Navbar } from "@nextui-org/react";

export const Header: FC = () => {
  const { data: session } = useSession();

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
          <Navbar.Link color="primary" onClick={() => signOut()}>
            Sign out
          </Navbar.Link>
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
