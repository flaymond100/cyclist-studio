import { useGetProfileData } from "../hooks/useGetProfileData";
import { Grid, Card, Col, Row, Text, Loading } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { USER_STATUS } from "../utils";
import { NextPage } from "next";
import { useGetInitialActivity } from "../hooks/useGetInitialActivity";

const Profile: NextPage = () => {
  const { data: session, status } = useSession();
  const { response, loading } = useGetProfileData();
  const { activity, activityLoading } = useGetInitialActivity();
  const router = useRouter();

  useEffect(() => {
    if (status === USER_STATUS.DENY) {
      router.push("/error/unauthorized");
    }
  }, [status]);

  if (status === USER_STATUS.LOADING || loading || activityLoading || !response)
    return (
      <Grid.Container
        css={{ textAlign: "center", marginTop: 100 }}
        justify="center"
        alignItems="center"
      >
        <Loading />
      </Grid.Container>
    );

  console.log(activity);
  return (
    <>
      <Grid.Container css={{ textAlign: "left", marginLeft: "8%" }}>
        <Grid>
          <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
            weight="bold"
          >
            Hi,
          </Text>
          <Grid direction="row">
            <Text
              h1
              size={70}
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
              weight="bold"
            >
              {response.firstname}
            </Text>
            <Text size={70}>
              <span role="img" aria-label="sheep">
                👋
              </span>
            </Text>
          </Grid>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={5}>
          <Card css={{ w: "40%", h: "200px" }}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={response.profile}
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Card example background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                height: "-webkit-fill-available",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
                backdropFilter: "saturate(180%) blur(2px)",
              }}
            >
              <Row>
                <Col>
                  <Text h3 color="white">
                    Your checklist for better sleep
                  </Text>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Profile;
