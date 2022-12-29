import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils";
import { Activity } from "../types/types";

export const useGetInitialActivity = () => {
  const { data: session } = useSession();
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [error, setError] = useState("");
  const [activityLoading, setActivityLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };
  const fetchData = () => {
    axios
      .get<Array<Activity>>(`${baseUrl}/athlete/activities`, config)
      .then((res) => {
        setActivities(res.data);
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

  return { activities, error, activityLoading };
};
