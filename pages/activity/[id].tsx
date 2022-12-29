import { useGetActivityStats } from "../../hooks/useGetActivity";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Grid, Loading } from "@nextui-org/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Line } from "react-chartjs-2";

const ActivityId: NextPage = () => {
  const router = useRouter();

  const { activityStats, activityStatsLoading } = useGetActivityStats(
    router.query.id!
  );

  if (!activityStats || activityStatsLoading) {
    return (
      <Grid.Container
        css={{ textAlign: "center", marginTop: 100 }}
        justify="center"
        alignItems="center"
      >
        <Loading />
      </Grid.Container>
    );
  }
  // const firstSecond = activityStats.watts.data[0];
  //
  // const bestOneMinutes: number = Math.round(
  //   activityStats.watts.data.reduce(
  //     (previousValue, currentValue, currentIndex) => {
  //       if (currentIndex < 60) return previousValue + currentValue;
  //       if (currentIndex === 60) {
  //         let newPowerNumber = Math.round(
  //           previousValue / 60 - firstSecond + currentValue
  //         );
  //         return newPowerNumber > previousValue
  //           ? newPowerNumber
  //           : previousValue;
  //       }
  //       if (currentIndex > 60) {
  //         const newIndex = currentIndex - 60;
  //         let newPowerNumber = Math.round(
  //           previousValue - activityStats.watts.data[newIndex] + currentValue
  //         );
  //         return newPowerNumber > previousValue
  //           ? newPowerNumber
  //           : previousValue;
  //       }
  //       return previousValue;
  //     },
  //     0
  //   )
  // );
  // const bestThirtySeconds = Math.round(
  //   activityStats.watts.data.reduce(
  //     (previousValue, currentValue, currentIndex) => {
  //       if (currentIndex < 30) return previousValue + currentValue;
  //       return previousValue;
  //     },
  //     0
  //   ) / 30
  // );
  const time = activityStats.time.data.map(
    (value) => Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : "00")
  );

  const defaultData = {
    labels: time,
    datasets: [
      { data: activityStats.watts.data },
      { data: activityStats.cadence.data },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Custom watts chart",
        color: "red",
        font: {
          size: 18,
        },
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 1,
        borderColor: "lightblue",
        fill: "start",
        backgroundColor: "lightblue",
      },
      point: {
        radius: 0,
        hitRadius: 1,
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: "red",
        },
      },
      y: {
        display: true,
        ticks: {
          color: "red",
        },
      },
    },
  };

  return <Line data={defaultData} width={100} height={40} options={options} />;
};

export default ActivityId;
