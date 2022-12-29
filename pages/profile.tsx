import { useGetProfileData } from "../hooks/useGetProfileData";
import { Grid, Text, Loading } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { USER_STATUS } from "../utils";
import { NextPage } from "next";
import { useGetInitialActivity } from "../hooks/useGetInitialActivity";
import { LastActivitiesTable } from "../components/LastActivitiesTable";
import { Activity } from "../types/types";

const Profile: NextPage = () => {
  const { data: session, status } = useSession();
  const { response, loading } = useGetProfileData();
  const { activities, activityLoading } = useGetInitialActivity();
  const router = useRouter();

  useEffect(() => {
    if (status === USER_STATUS.DENY) {
      router.push("/error/unauthorized");
    }
  }, [status]);

  if (
    status === USER_STATUS.LOADING ||
    loading ||
    activityLoading ||
    !response ||
    !activities
  )
    return (
      <Grid.Container
        css={{ textAlign: "center", marginTop: 100 }}
        justify="center"
        alignItems="center"
      >
        <Loading />
      </Grid.Container>
    );

  const cyclingActivities: Activity[] = activities.filter(
    (el) => el.type === "Ride" || el.type === "VirtualRide"
  );

  let watts = 0;
  cyclingActivities.map((el) => (watts += el.average_watts));
  return (
    <>
      <Grid.Container justify="space-between" css={{ padding: "0 8%" }}>
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
        <Grid>
          <Text
            h1
            size={60}
            css={{
              textAlign: "end",
              textGradient: "45deg, $red600 -10%, $green700 100%",
            }}
            weight="bold"
          >
            Get inside
          </Text>
          <Grid direction="row">
            <Text
              h1
              size={70}
              css={{
                textAlign: "end",
                textGradient: "45deg, $red600 -20%, $yellow600 100%",
              }}
              weight="bold"
            >
              Your stats
            </Text>
          </Grid>
          <Text
            css={{
              textAlign: "end",
            }}
            size={70}
          >
            <span role="img" aria-label="sheep">
              🚴🏼
            </span>
          </Text>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} justify="center" css={{ padding: "0 8%" }}>
        <Text
          css={{
            textAlign: "center",
          }}
          size={40}
        >
          You had <strong>{cyclingActivities.length}</strong> training sessions
          within last 30 days with average power{" "}
          <strong>
            {Boolean(Math.round(watts / cyclingActivities.length))
              ? Math.round(watts / cyclingActivities.length)
              : "..."}
          </strong>{" "}
          watts
        </Text>
        <LastActivitiesTable activities={cyclingActivities} />
      </Grid.Container>
    </>
  );
};

export default Profile;
