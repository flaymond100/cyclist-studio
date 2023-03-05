import { useGetProfileData } from '../hooks/useGetProfileData';
import { Grid, Text, Loading, Input, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { USER_STATUS } from '../utils';
import { NextPage } from 'next';
import { useGetInitialActivity } from '../hooks/useGetInitialActivity';
import { LastActivitiesTable } from '../components/LastActivitiesTable';
import { Activity } from '../types/types';
import { AppContext } from '../context/state';
import { LastfmLoginModal } from '../components/LastfmLoginModal';

const Profile: NextPage = () => {
  const { data: session, status } = useSession();
  const { response, loading } = useGetProfileData();
  const { activities, activityLoading } = useGetInitialActivity();
  const router = useRouter();
  const { lastfmUser } = useContext(AppContext);
  const [avarageHR, setAvarageHR] = useState<number>(0);
  const [cyclingActivities, setCyclingActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (status === USER_STATUS.DENY) {
      router.push('/error/unauthorized');
    }
  }, [status]);

  useEffect(() => {
    const act = activities.filter(
      (el) => el.type === 'Ride' || el.type === 'VirtualRide'
    );
    act && setCyclingActivities(act);
    const HR =
      cyclingActivities
        .map((el) => el.average_heartrate)
        .reduce(
          (previousValue, currentValue) => (previousValue += currentValue),
          0
        ) / cyclingActivities.length;

    HR && setAvarageHR(HR);
  }, [activities]);

  if (
    status === USER_STATUS.LOADING ||
    loading ||
    activityLoading ||
    !response ||
    !activities
  )
    return (
      <Grid.Container
        css={{ textAlign: 'center', marginTop: 100 }}
        justify="center"
        alignItems="center"
      >
        <Loading />
      </Grid.Container>
    );

  let watts = 0;
  cyclingActivities.map((el) => (watts += el.average_watts));
  console.log(Boolean(lastfmUser));

  return (
    <>
      {Boolean(lastfmUser) ? null : <LastfmLoginModal />}
      <Grid.Container justify="space-between" css={{ padding: '0 8%' }}>
        <Grid>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $purple600 -20%, $pink600 100%',
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
                textGradient: '45deg, $yellow600 -20%, $red600 100%',
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
              textAlign: 'end',
              textGradient: '45deg, $red600 -10%, $green700 100%',
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
                textAlign: 'end',
                textGradient: '45deg, $red600 -20%, $yellow600 100%',
              }}
              weight="bold"
            >
              Your stats
            </Text>
          </Grid>
          <Text
            css={{
              textAlign: 'end',
            }}
            size={70}
          >
            <span role="img" aria-label="sheep">
              🚴🏼
            </span>
          </Text>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} justify="center" css={{ padding: '0 8%' }}>
        <Text
          css={{
            textAlign: 'center',
          }}
          size={40}
        >
          You had <strong>{cyclingActivities.length}</strong> training sessions
          within last 30 days with average power{' '}
          <strong>
            {Boolean(Math.round(watts / cyclingActivities.length))
              ? Math.round(watts / cyclingActivities.length)
              : 'calculating...'}
          </strong>{' '}
          watts and average heart rate{' '}
          <strong>
            {avarageHR ? Math.floor(avarageHR) : 'calculating....'}
          </strong>
        </Text>
        <LastActivitiesTable activities={cyclingActivities} />
      </Grid.Container>
    </>
  );
};

export default Profile;
