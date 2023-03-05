import { FC, useMemo } from "react";
import {
  ActivityStatsInterface,
  useGetActivityStats,
} from "../../hooks/useGetActivity";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Grid, Loading } from "@nextui-org/react";
import { useAppContext } from "../../context/state";

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
  TimeScale,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  ArcElement,
  BarElement,
  Decimation,
  SubTitle,
  LogarithmicScale,
  RadialLinearScale,
  TimeSeriesScale,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  ArcElement,
  BarElement,
  Decimation,
  SubTitle,
  LogarithmicScale,
  RadialLinearScale,
  TimeSeriesScale
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

  return <Activity activityStats={activityStats} />;
};

const Activity: FC<{ activityStats: ActivityStatsInterface }> = ({
  activityStats,
}) => {
  const { lastfmUser } = useAppContext();
  console.log(lastfmUser);

  const time = useMemo(() => {
    if (activityStats.time.data.length < 3600) {
      return activityStats?.time.data.map(
        (value) =>
          Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : "00")
      );
    } else {
      return activityStats?.time.data.map((value) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value - hours * 3600) / 60);
        const seconds = value - hours * 3600 - minutes * 60;
        return (
          (hours ? hours + ":" : "") +
          (minutes ? (hours && minutes < 10 ? "0" : "") + minutes : "00") +
          ":" +
          (seconds < 10 ? "0" : "") +
          seconds
        );
      });
    }
  }, [activityStats?.time.data]);

  const defaultData = {
    labels: time,
    datasets: [
      {
        label: "Watts",
        data: activityStats.watts.data,
        borderColor: "red",
        radius: 0,
      },
      // {
      //   label: "Cadence",
      //   data: activityStats.cadence.data,
      //   borderColor: "green",
      //   radius: 0,
      // },
    ],
  };

  const enum DecimationAlgorithm {
    lttb = "lttb",
    minmax = "min-max",
  }
  const enum InteractionAxis {
    x = "x",
    y = "y",
    xy = "xy",
    r = "r",
  }
  const enum InteractionMode {
    nearest = "nearest",
  }
  const enum ScaleTime {
    time = "time",
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    // interaction: {
    //   mode: InteractionMode.nearest,
    //   axis: InteractionAxis.x,
    //   intersect: false,
    // },
    plugins: {
      // decimation: {
      //   enabled: true,
      //   algorithm: DecimationAlgorithm.lttb,
      //   samples: 50,
      // },
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
        borderWidth: 0.5,
      },
      point: {
        radius: 0,
        hitRadius: 1,
      },
    },
    // parsing: false,
    scales: {
      x: {
        ticks: {
          color: "red",
          maxRotation: 0,
          autoSkip: true,
        },
      },
    },
  };

  return <Line data={defaultData} width={100} height={40} options={options} />;
};

export default ActivityId;
