import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils";

export type ActivityStatsInterface = {
  watts: SingleActivityInterface;
  distance: SingleActivityInterface;
  cadence: SingleActivityInterface;
  heartrate: SingleActivityInterface;
  time: SingleActivityInterface;
};

export type SingleActivityInterface = {
  data: [number];
  original_size: number;
  resolution: string;
  series_type: string;
};

export const useGetActivityStats = (id: string | string[] | undefined) => {
  const { data: session } = useSession();
  const [activityStats, setActivityStats] = useState<ActivityStatsInterface>();
  const [error, setError] = useState("");
  const [activityStatsLoading, setActivityLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  const fetchData = () => {
    axios
      .get<ActivityStatsInterface>(
        `${baseUrl}/activities/${id}/streams?keys=time,heartrate,cadence,watts&key_by_type=true`,
        config
      )
      .then((res) => {
        setActivityStats(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setActivityLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return { activityStats, error, activityStatsLoading };
};
